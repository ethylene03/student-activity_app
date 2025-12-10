export interface Activity {
  id: string
  activity: string
  description: string
  timestamp: string
}

export interface DashboardStats {
  studentId: string
  totalCount: number
  todayCount: number
  dailyAverage: number
  countPerActivity: ActivityTypeCount[]
  countPerDay: DailyActivityCount[]
}

export interface ActivityTypeCount {
  activity: string
  count: number
}

export interface DailyActivityCount {
  date: string
  count: number
}
