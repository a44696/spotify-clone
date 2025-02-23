import { Router } from "express"

const router = Router();

router.get("/",(req,res)=>{
    res.send('stats route GET method')
})

export default router;