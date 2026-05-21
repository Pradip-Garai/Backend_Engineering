import User from "../models/users.js";

export const createUser = async (req,res)=>{
   try{

    const {firstName,lastName,email,jobTitle,gender} = req.body;
    if(!firstName || !email || !jobTitle){
        return res.status(400).json({
            message:`Firstname or Email or Job Title is missing !!!`,
            success:false
        });
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        jobTitle,
        gender
    });

    res.status(201).json({
        message:`User Created Successfull!!!`,
        user:newUser,
        success:true
    })

   }catch(err){
      console.log(`Error From Create User : ${err}`);
      res.status(500).json({
        message:`Internal Server Error`,
        success:false
      });
   }
}

export const getUserData = async (req,res)=>{
    try{

        const id = req.params.id;
        const data = await User.findById({_id:id});
        if(!data){
            return res.status(404).json({
                message:`Data Not Found !!!`,
                success:false
            });
        }

        res.status(200).json({
            user:data
        })

    }catch(err){
      console.log(`Error From Fetch User Data : ${err}`);
      res.status(500).json({
        message:`Internal Server Error`,
        success:false
      });
    }
}

export const updateUserDetails = async (req, res) => {
  try {

    const email = req.body.email;
    const id = req.params.id;

    const data = await User.findByIdAndUpdate(
      id,
      {
        email: email
      },
      {
        new: true
      }
    );

    if (!data) {
      return res.status(404).json({
        message: "User Not Found",
        success: false
      });
    }

    res.status(200).json({
      message: "User Data Updated Successfully",
      success: true,
      user: data
    });

  } catch (err) {

    console.log(`Error From Update User : ${err}`);

    res.status(500).json({
      message: "Internal Server Error",
      success: false
    });

  }
};

export const DeleteUser = async (req,res)=>{
    try{

        const id = req.params.id;
        const data = await User.findByIdAndDelete({_id:id});
        res.status(200).json({
            message:`User Deleted Successfull`,
            user:data
        })

    }catch(err){
       console.log(`Error From Delete User : ${err}`);

       res.status(500).json({
         message: "Internal Server Error",
         success: false
       });
    }
}