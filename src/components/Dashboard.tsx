import { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Plus,
  Target,
  BookOpen,
  Video,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock data
const tasks = [
  { id: 1, title: "Complete React project", completed: true, priority: "high", dueDate: "2024-01-20" },
  { id: 2, title: "Review team presentations", completed: false, priority: "medium", dueDate: "2024-01-21" },
  { id: 3, title: "Plan Q1 strategy meeting", completed: false, priority: "high", dueDate: "2024-01-22" },
  { id: 4, title: "Update documentation", completed: false, priority: "low", dueDate: "2024-01-25" },
];

const upcomingEvents = [
  { id: 1, title: "Team Standup", time: "9:00 AM", type: "meeting" },
  { id: 2, title: "React Workshop", time: "2:00 PM", type: "study" },
  { id: 3, title: "Client Call", time: "4:30 PM", type: "meeting" },
];

const stats = [
  { label: "Tasks Completed", value: 12, icon: CheckCircle, color: "text-primary" },
  { label: "Study Hours", value: 24, icon: BookOpen, color: "text-accent" },
  { label: "Meetings", value: 8, icon: Video, color: "text-secondary" },
  { label: "Focus Score", value: 85, icon: Target, color: "text-primary" },
];

export const Dashboard = () => {
  const [completedTasks, setCompletedTasks] = useState(tasks.filter(t => t.completed).length);
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const toggleTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setCompletedTasks(tasks.filter(t => t.completed).length);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your productivity today
          </p>
        </div>
        <Button className="gradient-primary hover-lift">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="gradient-card hover-lift">
            <CardContent className="flex items-center p-6">
              <div className={`p-3 rounded-lg bg-muted/30 mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Overview */}
        <div className="lg:col-span-2">
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">Today's Tasks</CardTitle>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {completedTasks}/{totalTasks} completed
              </Badge>
            </CardHeader>
            <CardContent>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Daily Progress</span>
                  <span className="font-medium text-primary">{progressPercentage}%</span>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-3 bg-muted"
                />
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-3 h-3" />}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{task.dueDate}</p>
                    </div>
                    
                    <Badge variant={getPriorityColor(task.priority) as any}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Calendar & Upcoming */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="w-2 h-8 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Start Study Session
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Video className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};