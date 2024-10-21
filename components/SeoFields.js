// components/SeoFields.js
import React from 'react';
import { useForm, usePlugin } from 'tinacms';

const SeoFields = () => {
  const form = useForm();
  const { registry } = usePlugin('formify');

  return (
    <>
      {registry.renderFields('seo', form.fields.seo)}
    </>
  );
};

export default SeoFields;