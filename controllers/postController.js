const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports={
    getPost:async(req,res)=>{
        try {
            const blogs = await prisma.post.findMany();
            res.render('blogs', { blogs });
          } catch (error) {
            console.error('Error retrieving blogs:', error);
            res.status(500).send('Internal Server Error');
          }
    },

    writePost:async(req,res)=>{
        // res.send("new post")
        const { title, content } = req.body;
        const image = req.file.filename;
        console.log('req.session.user',req.session.user);
        const authorContact = req.session.user.email

        try {
            const newBlog = await prisma.post.create({
              data: {
                title,
                content,
                image,
                authorContact,
              },
            });
        
            console.log('Blog post created:', newBlog);
            res.redirect('/posts'); 
          } catch (error) {
            console.error('Error creating blog post:', error);
            res.status(500).send('Internal Server Error');
          }
    },

    updatePost:async(req,res)=>{
        // res.send("post updated")
        const blogId = req.params.id
        const image = req.file ? req.file.filename : null;

  try {
    const { title,content,authorContact }=req.body
    const updatedBlog = await prisma.post.update({
      where: {
        id: blogId,
      },
      data: {
        title,
        content,
        image,
        authorContact,
      },
    });

    console.log('Blog post updated:', updatedBlog);
    res.redirect('/posts'); 
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).send('Internal Server Error');
  }
    },

    deletePost:async(req,res)=>{
        console.log("req.params.id",req.params.id);
        const blogId = parseInt(req.params.id);
        try {
            await prisma.post.delete({
              where: {
                id: blogId,
              },
            });
        
            console.log('Blog post deleted');
            res.redirect('/posts'); 
          } catch (error) {
            console.error('Error deleting blog post:', error);
            res.status(500).send('Internal Server Error');
          }
    }
}