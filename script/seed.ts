const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient();

const Categories = async() => {
    try{
        await db.category.createMany({
            data: [
                {name: "Photography"},
                {name: "Data Science"},
                {name: "Computer Science"},
                {name: "Fitness"},
                {name: "Music"},
                {name: "Accounting"},
                {name: "Art"}
            ],
            
        })
        console.log("Data sent successfully !");


    }catch(err){
        console.log("Something went wrong while creating !");

    }finally {
        await db.$disconnect();

    }

} 

Categories();