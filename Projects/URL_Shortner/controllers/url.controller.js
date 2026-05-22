import shortid from 'shortid';
import URL from '../models/url.model.js';

export const generateNewShortURL = async (req,res)=>{
    try{

        const url = req.body.url;
        if(!url){
            return res.status(400).json({
                message:`URL Missing !!!`,
                success:false
            });
        }

        const shortID = shortid();
        
        const result = await URL.create({
            shortId:shortID,
            redirectURL: url,
            visitedHistory:[]
        });

        return res.render("Home",{
            id:shortID
        });

    }catch(err){
       console.log(`Error from ShortID Generator: ${err}`);
       res.status(500).json({
        message:`Internal Server Error`,
        success:false
       })
    }
}

export const redirtedURL = async (req,res)=>{
    try{

        const shortId = req.params.shortId;
        const entry =  await URL.findOneAndUpdate({shortId:shortId},{
            $push:{
                visitedHistory:{
                    timestamp:Date.now()
                }
                
            }
        })

        res.redirect(entry.redirectURL);

    }catch(err){
       console.log(`Error from Redirect URL: ${err}`);
       res.status(500).json({
        message:`Internal Server Error`,
        success:false
       }) 
    }
}

export const analyticsURL = async (req,res)=>{
    try{

        const shortId = req.params.shortId;
        const result = await URL.findOne({shortId});

        res.status(200).json({
            totalClicks: `${result.visitedHistory.length}`,
            urls:result,
            success:true
        });

    }catch(err){
       console.log(`Error from Analytics URL: ${err}`);
       res.status(500).json({
        message:`Internal Server Error`,
        success:false
       })
    }
}
