const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
module.exports={

    register:async(req,res)=>{
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

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
                // res.send('user registered').json(user)
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
            // res.send('user verified')
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
    }

}