/* 
  Tests for the "Update TinaCMS Dependencies" GitHub Actions workflow.
  Framework compatibility: uses describe/it with Node's built-in assert to work under Jest/Mocha/Vitest.
*/
const fs = require('fs');
const path = require('path');
const assert = require('assert');

function loadWorkflowContentByName(workflowName) {
  const workflowsDir = path.join(process.cwd(), '.github', 'workflows');
  assert.ok(fs.existsSync(workflowsDir), `Workflows directory not found at ${workflowsDir}`);

  const files = fs.readdirSync(workflowsDir).filter(f => /\.(ya?ml)$/i.test(f));
  assert.ok(files.length > 0, 'No workflow YAML files found under .github/workflows');

  for (const file of files) {
    const p = path.join(workflowsDir, file);
    const content = fs.readFileSync(p, 'utf8');
    if (new RegExp(`^\\s*name:\\s*${workflowName}\\s*$`, 'm').test(content)) {
      return { filePath: p, content };
    }
  }
  assert.fail(`No workflow with name "${workflowName}" found in .github/workflows`);
}

function indexOfOrFail(haystack, needle, msg) {
  const idx = haystack.indexOf(needle);
  assert.ok(idx >= 0, msg || `Expected to find "${needle}"`);
  return idx;
}

function textHasLine(content, regex, msg) {
  const matched = content.match(regex);
  assert.ok(\!\!matched, msg || `Expected to match ${regex}`);
}

describe('GitHub Actions Workflow: "Update TinaCMS Dependencies"', () => {
  const WORKFLOW_NAME = 'Update TinaCMS Dependencies';
  let workflow;

  beforeAll?.(() => { workflow = loadWorkflowContentByName(WORKFLOW_NAME); });
  before?.(() => { workflow = loadWorkflowContentByName(WORKFLOW_NAME); });

  it('should exist under .github/workflows and be named correctly', () => {
    assert.ok(workflow && workflow.filePath && workflow.content, 'Workflow content was not loaded');
    textHasLine(workflow.content, /^\s*name:\s*Update TinaCMS Dependencies\s*$/m, 'Workflow name line is missing or incorrect');
  });

  it('should be triggered on push to dependabot/npm_and_yarn/** branches', () => {
    // Allow flexible whitespace/indentation
    const re = new RegExp(
      [
        '^\\s*on:\\s*$',                  // on:
        '[\\s\\S]*?^\\s*push:\\s*$',      //   push:
        '[\\s\\S]*?^\\s*branches:\\s*$',  //     branches:
        '[\\s\\S]*?^\\s*-\\s*dependabot\\/npm_and_yarn\\/\\*\\*\\s*$', //       - dependabot/npm_and_yarn/**
      ].join(''),
      'm'
    );
    textHasLine(workflow.content, re, 'Push trigger for dependabot/npm_and_yarn/** is missing');
  });

  it('should request write permission for contents', () => {
    const re = /^\s*permissions:\s*$[\s\S]*?^\s*contents:\s*write\s*$/m;
    textHasLine(workflow.content, re, 'permissions.contents: write is missing');
  });

  it('should define a job "update-tinacms" running on ubuntu-latest', () => {
    const jobsIdx = indexOfOrFail(workflow.content, '\njobs:\n', 'jobs: section is missing');
    const jobNameRe = /^\s*jobs:\s*[\s\S]*?^\s*update-tinacms:\s*$/m;
    textHasLine(workflow.content, jobNameRe, 'Job "update-tinacms" not found');

    // runs-on under that job
    const runsOnRe = /^\s*update-tinacms:\s*[\s\S]*?^\s*runs-on:\s*ubuntu-latest\s*$/m;
    textHasLine(workflow.content, runsOnRe, '"runs-on: ubuntu-latest" not found under update-tinacms');
  });

  it('should include steps in correct order with expected actions and commands', () => {
    const c = workflow.content;

    const idxSteps = indexOfOrFail(c, '\n    steps:\n', 'steps section missing under update-tinacms');

    const idxCheckout = indexOfOrFail(c, 'uses: actions/checkout@v2', 'Checkout step uses actions/checkout@v2');
    const idxSetupNode = indexOfOrFail(c, 'uses: actions/setup-node@v3', 'Setup node step uses actions/setup-node@v3');
    const idxNodeVersion = indexOfOrFail(c, 'node-version: 18', 'Node version should be 18');
    const idxInstall = indexOfOrFail(c, 'run: yarn install', 'Install dependencies step missing (yarn install)');
    const idxUpgrade = indexOfOrFail(c, 'run: yarn upgrade tinacms@latest @tinacms/cli@latest', 'Upgrade Tina packages step missing');
    const idxAudit = indexOfOrFail(c, 'run: yarn tinacms audit', 'Update Schema step (yarn tinacms audit) missing');
    const idxCommit = indexOfOrFail(c, 'uses: EndBug/add-and-commit@v9', 'Commit step using EndBug/add-and-commit@v9 missing');

    // Order assertions
    assert.ok(idxSteps < idxCheckout, 'steps should precede checkout step');
    assert.ok(idxCheckout < idxSetupNode, 'checkout should come before setup-node');
    assert.ok(idxSetupNode < idxNodeVersion, 'setup-node should precede node-version config');
    assert.ok(idxNodeVersion < idxInstall, 'node-version should be before yarn install');
    assert.ok(idxInstall < idxUpgrade, 'install should be before upgrade step');
    assert.ok(idxUpgrade < idxAudit, 'upgrade should precede audit');
    assert.ok(idxAudit < idxCommit, 'audit should precede commit step');

    // Commit step configuration
    const commitWithRe = new RegExp(
      [
        '^\\s*-\\s*name:\\s*Commit changes back to branch\\s*$',
        '[\\s\\S]*?^\\s*uses:\\s*EndBug\\/add-and-commit@v9\\s*$',
        '[\\s\\S]*?^\\s*with:\\s*$',
        '[\\s\\S]*?^\\s*message:\\s*"Update TinaCMS generated files"\\s*$',
        '[\\s\\S]*?^\\s*branch:\\s*\\$\\{\\{\\s*github\\.ref\\s*\\}\\}\\s*$',
        '[\\s\\S]*?^\\s*committer_name:\\s*GitHub Actions\\s*$',
        '[\\s\\S]*?^\\s*committer_email:\\s*actions@github\\.com\\s*$',
      ].join(''),
      'm'
    );
    textHasLine(c, commitWithRe, 'Commit step "with" configuration is missing or incorrect');
  });

  it('should use exact action versions as specified (no major drift)', () => {
    // Guard against unintended upgrades
    textHasLine(workflow.content, /^\s*uses:\s*actions\/checkout@v2\s*$/m, 'Expected actions/checkout@v2 exactly once');
    textHasLine(workflow.content, /^\s*uses:\s*actions\/setup-node@v3\s*$/m, 'Expected actions/setup-node@v3 exactly once');
    textHasLine(workflow.content, /^\s*uses:\s*EndBug\/add-and-commit@v9\s*$/m, 'Expected EndBug/add-and-commit@v9 exactly once');
  });

  it('should run yarn commands without additional unexpected flags (sanity checks)', () => {
    // Validate the core yarn commands appear as intended
    const lines = workflow.content.split(/\r?\n/);
    const yarnRuns = lines.filter(l => l.trim().startsWith('run: yarn ')).map(l => l.trim());
    assert.ok(
      yarnRuns.includes('run: yarn install'),
      'Missing "yarn install"'
    );
    assert.ok(
      yarnRuns.includes('run: yarn upgrade tinacms@latest @tinacms/cli@latest'),
      'Missing "yarn upgrade tinacms@latest @tinacms/cli@latest"'
    );
    assert.ok(
      yarnRuns.includes('run: yarn tinacms audit'),
      'Missing "yarn tinacms audit"'
    );
    // Ensure no obvious extra destructive flags slipped in
    assert.ok(
      \!yarnRuns.some(l => /--force|--non-interactive|--immutable|--frozen-lockfile/.test(l)),
      'Unexpected strict/force flags present in yarn commands'
    );
  });
});