import mongoose from 'mongoose'

const isObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

const isValidDocument = async (Model, id) => {
    if (isObjectId(id)) {
        const doc = await Model.findById(id);
        return doc !== null;
    }
    return false;
};

const paginateQuery = async (Model, page, limit, query = {}) => {
    const skip = (page - 1) * limit;
    const results = await Model.find(query).skip(skip).limit(limit);
    const total = await Model.countDocuments(query);

    return {
        results,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
};

const deleteDocument = async (Model, id) => {
    if (isObjectId(id)) {
        const deletedDoc = await Model.findByIdAndDelete(id);
        return deletedDoc !== null;
    }
    throw new Error('Invalid ObjectId');
};

const updateDocument = async (Model, id, updateData) => {
    if (isObjectId(id)) {
        const updatedDoc = await Model.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedDoc) {
            return updatedDoc;
        }
    }
    throw new Error('Document not found');
};




export { isObjectId, isValidDocument, paginateQuery, deleteDocument, updateDocument }
