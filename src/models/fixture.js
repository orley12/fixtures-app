// grab the things we need
import mongoose from 'mongoose';
import { Team } from './team';
import { config } from '../config/constants';
const { HOST_URL } = config();

const Schema = mongoose.Schema;

// create a schema
const fixtureSchema = new Schema({
    date: { type: String, required: true },
    description: { type: String, required: true },
    homeTeamScore: { type: Number, required: true },
    awayTeamScore: { type: Number, required: true },
    state: { type: String, required: true },
    fixtureUrl: { type: String },
    created_at: Date,
    updated_at: Date,
    homeTeamId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },
    awayTeamId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
});

// on every save, add the date
fixtureSchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

fixtureSchema.post('save', async function(doc, next) {
  const { _id, homeTeamId, awayTeamId } = doc;
  const fixtureUrl = `${HOST_URL}/fixture/${_id}`;

  await Fixture.findOneAndUpdate({ _id }, { fixtureUrl });
  
  await Team.findOneAndUpdate({'_id': homeTeamId}, { '$push': { 'fixtures': _id } });
  await Team.findOneAndUpdate({'_id': awayTeamId}, { '$push': { 'fixtures': _id } });

  next();
});

export const Fixture = mongoose.model('Fixture', fixtureSchema);