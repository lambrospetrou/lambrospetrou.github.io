# MicroBlog
Micro blog service powered by Go - blog.lambrospetrou.com will be based on this!

I will follow the [Jekyll](http://jekyllrb.com/ "Jekyll static site generator") structure since it is a very well accepted and used format and it is directly used in Github pages. So I will slowly create a Go Jerkyll static site generator (future work in progress). 

I will use *Go* [templates](http://golang.org/pkg/text/template/ "Golang templates"). Initially will be used just for my blog but I will add functionality slowly step by step.

## Directory structure

The blog articles will be in three folders as follows:
1. *_posts* contains all the articles ready for publishing
2. *_pending* contains all the finished articles that are yet to be moved to *published* folder
3. *_drafts* contains all unfinished articles that are in progress and should not be published when the generator creates the website

### Blog Article

Each post article has its own directory/folder and inside that folder reside all images, files and markdown code for the article.

For example, assuming a blog post with URL firendly name *how-to-make-a-blog* we have the following folder structure:

Folder name: *how-to-make-a-blog*
And inside that folder we have:
- data/
- how-to-make-a-blog.md

As you can see the directory of the post contains all the information that makeup that article, including all images, files referenced and the markup code for the article text.

The post directory will exist in **only one** of the three post stages described above depending on the post status (*draft*, *pending*, *published* for *_posts*).

## Site generation

In order to generate the website we run the *site generator* which reads from the *published* folder all the articles and based on the html templates located in the directory *_layouts* creates the static website and puts everything in the directory *_site*.

### *_sites* directory

The generated output directory has the following structure.

**_sites**
- *articles/:article-url/:post-data:* 
- *s/* contains static files to be imported
	* _css/_ the css files
	* _libs/_ any javascript libraries
- *index.html* the home index of the website (contains all the blog articles titles and dates, links to CV and bio/work)

## Configuration

Configuration and user-custom variables will be added in a later version of the site generator.








