import { Fixture } from '../models/fixture';

export const createAFixture = (fixture) => {
  return Fixture.create(fixture);
};

export const updateAFixture = (_id, fixture) => {
  return Fixture.findOneAndUpdate({ _id }, fixture, { 
      new: true, 
      useFindAndModify: false 
  });
};

export const deleteAFixture = (_id) => {
  return Fixture.findOneAndDelete({ _id })
}

export const findFixtureById = (_id) => {
  return Fixture.findById(_id);
};

export const findAllFixtures = (date = {}) => {
  return Fixture.find(date);
};
