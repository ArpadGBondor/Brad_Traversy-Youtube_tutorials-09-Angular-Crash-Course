require("dotenv").config();
const mongoose = require("mongoose");
let connection = null;
const connectDB = () => {
  if (connection === null)
    connection = mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
};

const convertId = ({ _id, task, day, reminder }) => ({
  id: _id,
  task,
  day,
  reminder,
});

// Error fixed: "Cannot overwrite `Task` model once compiled."
const defineTaskModel = () => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const taskSchema = Schema({
    id: ObjectId,
    task: String,
    day: String,
    reminder: Boolean,
  });

  return mongoose.model("Task", taskSchema);
};

const Task = mongoose.models.Task || defineTaskModel();

exports.handler = async (event, context, callback) => {
  const notSupportedMethod = {
    statusCode: 405,
    body: "ERROR-405: Method Not Allowed.",
  };

  // GET            => get array of tasks
  // POST           => add new task
  // PUT?id=...     => update document with id
  // Delete?id=...  => remove document with  id

  if (event.httpMethod === "GET") {
    return await handleGetRequest(event, context, callback);
  } else if (event.httpMethod === "POST") {
    return await handlePostRequest(event, context, callback);
  } else if (event.httpMethod === "PUT") {
    return await handlePutRequest(event, context, callback);
  } else if (event.httpMethod === "DELETE") {
    return await handleDeleteRequest(event, context, callback);
  } else {
    return notSupportedMethod;
  }
};

// GET            => get array of tasks
async function handleGetRequest(event, context, callback) {
  try {
    connectDB();

    const taskList = await Task.find({});
    const data = taskList.map(convertId);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "ERROR-500: Server Error.",
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: "ERROR-500: Server Error.",
  };
}

// POST           => add new task
async function handlePostRequest(event, context, callback) {
  try {
    connectDB();

    const { task, day, reminder } = JSON.parse(event.body);
    // const data = `Add new document: task: "${task}", day: "${day}", reminder: "${reminder}"`;

    const data = await Task.create({ task, day, reminder });

    return {
      statusCode: 200,
      body: JSON.stringify(convertId(data)),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "ERROR-500: Server Error.",
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: "ERROR-500: Server Error.",
  };
}

// PUT?id=...     => update document with id
async function handlePutRequest(event, context, callback) {
  try {
    connectDB();

    const { id } = event.queryStringParameters;
    const { task, day, reminder } = JSON.parse(event.body);

    //const data = `Update document with id: ${id} task: "${task}", day: "${day}", reminder: "${reminder}"`;

    const doc = await Task.findOne({ _id: id });

    const updateObject = {};
    if (typeof task !== "undefined") updateObject["task"] = task;
    if (typeof day !== "undefined") updateObject["day"] = day;
    if (typeof reminder !== "undefined") updateObject["reminder"] = reminder;

    await doc.updateOne(updateObject);

    const data = await Task.findOne({ _id: id });

    return {
      statusCode: 200,
      body: JSON.stringify(convertId(data)),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "ERROR-500: Server Error.",
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: "ERROR-500: Server Error.",
  };
}

// Delete?id=...  => remove document with  id
async function handleDeleteRequest(event, context, callback) {
  try {
    connectDB();

    const { id } = event.queryStringParameters;
    // const data = `Delete document with id: "${id}"`;

    const data = await Task.deleteOne({ _id: id });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "ERROR-500: Server Error.",
    };
  }

  //Just in case I forgot to return something somewhere, I send back server error
  return {
    statusCode: 500,
    body: "ERROR-500: Server Error.",
  };
}
