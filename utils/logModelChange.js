export default function logModelChange(modelInstance, action) {
    console.log(`Model ${modelInstance.constructor.name} has been ${action}🔵`.white);
    modelInstance.logs.push({ action, timestamp: Date.now() });
    modelInstance.save();
}

