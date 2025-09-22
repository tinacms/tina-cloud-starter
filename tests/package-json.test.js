/**
 * Framework: Node.js built-in test runner (node:test) + assert/strict
 * Purpose: Validate package.json structure and critical script/dependency contracts
 * Focus: Scripts and dependencies shown in the PR diff context for package.json
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pkgPath = path.resolve(process.cwd(), 'package.json');
assert.ok(fs.existsSync(pkgPath), 'package.json must exist at repository root');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

describe('package.json: basic metadata', () => {
  test('has correct name, version format, and private flag', () => {
    assert.equal(pkg.name, '@tinacms/starter', 'name should be @tinacms/starter');
    assert.match(pkg.version, /^\d+\.\d+\.\d+$/, 'version should be semver x.y.z');
    assert.equal(pkg.private, true, 'private should be true');
  });
});

describe('package.json: scripts contract', () => {
  test('scripts object present', () => {
    assert.ok(pkg.scripts && typeof pkg.scripts === 'object', 'scripts must be an object');
  });

  test('dev uses tinacms dev with Next.js turbopack', () => {
    assert.equal(
      pkg.scripts.dev,
      'tinacms dev -c "next dev --turbopack"',
      'dev script must use tinacms dev -c "next dev --turbopack"'
    );
  });

  test('build runs tinacms build then next build', () => {
    assert.equal(
      pkg.scripts.build,
      'tinacms build && next build',
      'build script must run tinacms build && next build'
    );
  });

  test('build-local includes local flags and skips indexing/cloud checks before next build', () => {
    const s = pkg.scripts['build-local'];
    assert.ok(typeof s === 'string', 'build-local script must exist');
    assert.ok(/tinacms build/.test(s), 'build-local must start with tinacms build');
    assert.ok(/--local\b/.test(s), 'build-local must include --local');
    assert.ok(/--skip-indexing\b/.test(s), 'build-local must include --skip-indexing');
    assert.ok(/--skip-cloud-checks\b/.test(s), 'build-local must include --skip-cloud-checks');
    assert.ok(/&& next build$/.test(s), 'build-local must end with && next build');
  });

  test('start runs tinacms build then next start', () => {
    assert.equal(
      pkg.scripts.start,
      'tinacms build && next start',
      'start script must run tinacms build && next start'
    );
  });

  test('export performs a full build before next export', () => {
    assert.equal(
      pkg.scripts.export,
      'npm run build && next export',
      'export script must run npm run build && next export'
    );
  });

  test('lint uses biome', () => {
    assert.equal(pkg.scripts.lint, 'biome lint', 'lint script must be biome lint');
  });

  test('dev:build triggers next build', () => {
    assert.equal(pkg.scripts['dev:build'], 'next build', 'dev:build must be next build');
  });
});

describe('package.json: devDependencies sanity', () => {
  const devDeps = pkg.devDependencies || {};
  test('TypeScript toolchain present', () => {
    assert.ok(devDeps.typescript, 'typescript should be listed in devDependencies');
    assert.match(devDeps.typescript, /^\^?\d+\.\d+\.\d+/, 'typescript version should be semver');
    assert.ok(devDeps['@types/node'], '@types/node should be listed');
    assert.ok(devDeps['@types/react'], '@types/react should be listed');
  });

  test('Biome linter present', () => {
    assert.ok(devDeps['@biomejs/biome'], '@biomejs/biome should be listed');
  });

  test('TinaCMS CLI present for build-time commands', () => {
    assert.ok(devDeps['@tinacms/cli'], '@tinacms/cli should be listed for tinacms build/dev scripts');
  });
});

describe('package.json: runtime dependencies essentials', () => {
  const deps = pkg.dependencies || {};

  test('Next.js pinned and compatible with React 18.3', () => {
    assert.equal(deps.next, '15.3.0', 'next should be pinned to 15.3.0');
    assert.ok(deps.react, 'react should be present');
    assert.ok(deps['react-dom'], 'react-dom should be present');
    assert.match(deps.react, /^\^?18\./, 'react should be 18.x');
    assert.match(deps['react-dom'], /^\^?18\./, 'react-dom should be 18.x');
  });

  test('TinaCMS present', () => {
    assert.ok(deps.tinacms, 'tinacms should be present');
    assert.match(deps.tinacms, /^\^?2\./, 'tinacms should be version 2.x');
  });

  test('TailwindCSS v4 and related tooling present', () => {
    assert.ok(deps.tailwindcss, 'tailwindcss should be present');
    assert.match(deps.tailwindcss, /^\^?4\./, 'tailwindcss should be v4.x');
    assert.ok(deps['@tailwindcss/postcss'], '@tailwindcss/postcss should be present');
  });
});

describe('package.json: defensive checks', () => {
  test('no obviously dangerous lifecycle scripts', () => {
    const scripts = pkg.scripts || {};
    const dangerous = ['preinstall', 'postinstall', 'prepare'];
    for (const key of dangerous) {
      if (scripts[key]) {
        // If present, ensure they do not execute network or shell downloads (basic heuristic)
        assert.ok(
          \!/(curl|wget)\s+https?:/i.test(scripts[key]),
          `${key} script should not fetch remote code`
        );
      }
    }
  });
});