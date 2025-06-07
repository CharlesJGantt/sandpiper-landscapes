module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: '/' });
  eleventyConfig.addCollection('post', function(collection) {
    return collection.getFilteredByGlob('content/posts/*.md');
  });
  return {
    dir: {
      input: 'content',
      output: 'dist',
      includes: '../_includes',
      layouts: '../_layouts'
    }
  };
};
