import { Schema, models, model } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    require: [true, 'Prompt text is required!']
  },
  tag: {
    type: String,
    require: [true, 'Prompt tag is required!']
  }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt;