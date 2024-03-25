const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)) 
        .catch((err)=> next(err))
        // .resolve -> execute func. | .catch ~ reject
    }
}

export {asyncHandler}




// const asyncHandler = () => {}
// const asyncHandler = (func) = () => {}
// const asyncHandler = (func) = async() => {}

// doing via try-catch, above one is doing via promises

// const asyncHandler = (fn) => async(req,res,next) =>{
//     try {
//         await fn(req,res,next)        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }