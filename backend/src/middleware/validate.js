const ApiError=require("../utils/APIError");
const validate=(Schema,source="body") => (req,res,next) => {
    const result=Schema.safeParse(req[source]);
    if(!result.success) {
        return next(ApiError.badRequest("Validation failed",result.error.issues));
    }
    req[source] =result.data;
    next();
};
module.exports={validate};