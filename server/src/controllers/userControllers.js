import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { User } from "../models/user.js";

const completionDays = asyncHandler(async (req,res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const completionDays = user.completedDays;

  res.status(201).json(
    new ApiResponse(200,completionDays)
  )
})

const streakCalculator = (datesArray)=>{
  if (datesArray.length === 0) return 0;
  const dateSet = new Set(datesArray.map(date => date.toISOString().split('T')[0]));
  const sortedDates = [...dateSet].sort((a, b) => new Date(b) - new Date(a));
  const today = new Date(new Date().toISOString().split('T')[0]);
  const firstDate = new Date(sortedDates[0]);
  let streak = 0;
  if((today - firstDate) / (1000 * 60 * 60 * 24) > 1){
    streak = 0;
  }else{
    streak = 1;
    let currentDate = new Date(sortedDates[0]);
    for (let i = 1; i < sortedDates.length; i++) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (sortedDates[i] === currentDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }
  }
  return streak;
}

const getStreak = asyncHandler(async (req,res) => {
  const {id} = req.params;
  const user = await User.findById(id);

  user.streak = Number(streakCalculator(user.completedDays));
  user.save();

  res.status(201).json(
    new ApiResponse(200,user.streak)
  )
})

const addCompletionDay = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {date} = req.body;
  const dateObject = new Date(date);

  const user = await User.findById(id);
  const completionDays = user.completedDays;
  
  user.completedDays = [...completionDays,dateObject]
  user.streak = Number(streakCalculator(user.completedDays));
  
  user.save();
  res.status(201).json(
    new ApiResponse(200)
  )
})

const fetchDetails = asyncHandler(async (req,res) => {
  const {id} = req.params;
  const user = await User.findById(id).select("-completedDays");

  res.status(201).json(
    new ApiResponse(200,user)
  )
})

export {
  completionDays,
  addCompletionDay,
  fetchDetails,
  getStreak
}
