// grab the things we need
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const teamSchema = new Schema({
  teamName: { type: String, required: true, unique: true },
  stadium: { type: String, required: true },
  location: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
  fixtures: [{
    type: Schema.Types.ObjectId, 
    ref: 'Fixture'
  }],
  creatorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});

// on every save, add the date
teamSchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

export const Team = mongoose.model('Team', teamSchema);