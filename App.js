const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose=require("mongoose");
const server = express();
const ChildRouter = require("./routes/child");
const TeacherRouter=require("./routes/teacher")
const ClassRputer=require("./routes/class")
const Authantication=require("./routes/authntication")
const Auth=require("./MW/Auth/Authorization")
const path=require("path")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
let port = process.env.Port || 8000;





/*-------------------------------------------------------connect to database-------------------------------------------------------*/
mongoose.connect(process.env.db_URL)
.then(()=>{
    console.log("DB connected .... ");
    server.listen(port,()=>{
        console.log("I am listening .........",port);
    });
})
.catch((error)=>{
    console.log("DB connection Problem "+error);
})

/*-------------------------------------------------------Middlewares and Routes----------------------------------------------------*/
server.use(express.json())
server.use(morgan('dev'))
server.use(cors())
server.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(Authantication)
server.use(Auth)
server.use(express.static(path.join(__dirname, 'images')))
server.use(express.json())
server.use( ChildRouter);
server.use(TeacherRouter);
server.use(ClassRputer)




/*------------------------------------------------------ middle ware of not found---------------------------------------------------------*/ 
server.use((request, response) => {
    console.log("forth middleware of not found");
    response.status(404).json({ message: "not found" });
});

/*------------------------------------------------------ middle ware of error---------------------------------------------------------*/ 
server.use((error, request, response, next) => {
    console.log("Error in server:", error);
    response.status(error.status||500).json({message:error+""});
});