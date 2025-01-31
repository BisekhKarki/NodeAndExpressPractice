const Product = require("../models/product")

const getAllProductsStatic = async (req,res)=>{ 
    // throw new Error('testing async errors')
    const products = await Product.find({ })
    .sort('name')
    .select('name price')
    // .limit(10) 
    // .skip(1)
    res.status(200).json({products,  nbHits:products.length})
}


const getAllProducts = async (req,res)=>{
    const { featured,   
        company,
        name,
        sort,
        fields,
        numericFilters
    } = req.query;

    const queryObject = {}

    // For featured
    if(featured){
        queryObject.featured = featured === 'true' ? true : false 
    }
    // For company
    if(company){
        queryObject.company = company 
    }

    // For name
    if(name){
        queryObject.name = { $regex:name, $option: company }
    }

    // For numeric filter
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        const options = ['price','rating']
        filters = filters.split(',').forEach((item)=>{
            const [ field,operator ] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })

    }

    console.log(queryObject)
    let result = Product.find(queryObject);

    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
        // console.log(sort)
        // products = products.sort()
    }else {
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1 ) * limit

    result = result.skip(skip).limit(limit)


    const products = await result 

    res.status(200).json({ products,  nbHits:products.length })
}


module.exports = {
    getAllProductsStatic,
    getAllProducts
}