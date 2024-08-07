class RecipeFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    filter(){
     //normal filtering
    const queryObj = {...this.queryStr};
    const excludedFields = ["page","sort","limit","fields"];
    excludedFields.forEach(field => delete queryObj[field]);

    //advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
    };

    sort(){
        if(this.queryStr.sort){
            const sortby = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortby);
        }else{
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        if(this.query.fields){
            const fields = this.query.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }
        return this;
    };

    paginate(){
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 100;
        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = RecipeFeatures;