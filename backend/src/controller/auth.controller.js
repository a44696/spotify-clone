import {User} from "../models/user.model.js"
export const authCallback = async(req,res)=>{
    try {
        const {id,firstName,lastName,imageUrl}=req.body;

        const user = await User.findOne({clerkid: id}); 

        if (!user){
            //sign up
            await User.create({
                clerkId: id,
                fullName: `${firstName} , ${lastName}`,
                imageUrl,
            });
        }
        res.status(200).json({sucsess: true});
    } catch (error) {
        console.log("error auth callback", error);
        res.status(500).json({message: "Internal server error ", error});
    }
}