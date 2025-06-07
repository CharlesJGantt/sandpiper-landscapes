---
title: Blog
layout: base.njk
---
# Blog

{% for post in collections.post %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}
