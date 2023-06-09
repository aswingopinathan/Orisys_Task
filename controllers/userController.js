const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
module.exports={

    register:async(req,res)=>{
        const { firstName, lastName, email, password } = req.body;
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const user = await prisma.user.create({
              data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
            console.log('User created:', user);
            if(user){
              req.session.user = {
                firstName: user.firstName,
                lastName: user.lastName,
                email:user.email,
                userId:user.id
              };
                res.redirect('/posts')
            }else{
                res.sendStatus(500)
            }
          } catch (error) {
            console.error('Error creating user:', error);
          } finally {
            await prisma.$disconnect();
          }
    },

    login:async(req,res)=>{
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
          });
        
          if (!user) {
            throw new Error('User not found');
          }
        
          const isPasswordValid = await bcrypt.compare(password, user.password);
           if(isPasswordValid){
            req.session.user = {
              firstName: user.firstName,
              lastName: user.lastName,
              email:user.email,
              userId:user.id
            };
            res.redirect('/posts')
           }else{
            res.send("invalid password")
           }
    },

    logout:(req,res)=>{
      req.session.user=false;
      res.redirect('/users/login')
    }

}