import { useState } from "react";
import { 
  BookOpen, 
  Play, 
  PauseCircle,
  Clock, 
  Trophy,
  Target,
  Plus,
  Check,
  X,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CortexMascot from "@/assets/cortex-mascot.png";

const studyMaterials = [
  { 
    id: 1, 
    title: "React Advanced Concepts", 
    progress: 75, 
    duration: "2.5 hours",
    category: "Development",
    difficulty: "Advanced" 
  },
  { 
    id: 2, 
    title: "UI/UX Design Principles", 
    progress: 40, 
    duration: "3 hours",
    category: "Design",
    difficulty: "Intermediate" 
  },
  { 
    id: 3, 
    title: "TypeScript Fundamentals", 
    progress: 90, 
    duration: "1.5 hours",
    category: "Development",
    difficulty: "Beginner" 
  },
  { 
    id: 4, 
    title: "Database Management", 
    progress: 20, 
    duration: "4 hours",
    category: "Backend",
    difficulty: "Advanced" 
  },
];

const quizQuestions = [
  {
    question: "What is the primary purpose of React hooks?",
    options: [
      "To style components",
      "To manage state and lifecycle in functional components",
      "To create class components",
      "To handle routing"
    ],
    correct: 1
  },
  {
    question: "Which hook is used for side effects?",
    options: [
      "useState",
      "useContext",
      "useEffect",
      "useReducer"
    ],
    correct: 2
  }
];

export const Study = () => {
  const [isStudying, setIsStudying] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  
  const studyStats = {
    totalHours: 24,
    weeklyGoal: 30,
    completedCourses: 3,
    currentStreak: 5
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-primary/10 text-primary";
      case "Intermediate": return "bg-accent/10 text-accent";
      case "Advanced": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz complete
        setTimeout(() => setShowQuiz(false), 1000);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Study Hub 📚
          </h1>
          <p className="text-muted-foreground">
            Track your learning progress and stay motivated
          </p>
        </div>
        <Dialog open={showQuiz} onOpenChange={(open) => {
          setShowQuiz(open);
          if (!open) resetQuiz();
        }}>
          <DialogTrigger asChild>
            <Button className="gradient-accent hover-lift">
              <Brain className="h-4 w-4 mr-2" />
              Quick Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <img src={CortexMascot} alt="Cortex" className="w-8 h-8" />
                React Knowledge Quiz
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span>Score: {score}/{quizQuestions.length}</span>
              </div>
              
              <Progress value={((currentQuestion) / quizQuestions.length) * 100} />
              
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">
                  {quizQuestions[currentQuestion].question}
                </h3>
                
                <div className="space-y-2">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-3 text-left rounded-lg border transition-all ${
                        selectedAnswer === null
                          ? "border-border hover:border-primary hover:bg-muted/50"
                          : selectedAnswer === index
                          ? index === quizQuestions[currentQuestion].correct
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : index === quizQuestions[currentQuestion].correct
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedAnswer !== null && (
                          <>
                            {index === quizQuestions[currentQuestion].correct && (
                              <Check className="h-4 w-4" />
                            )}
                            {selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                              <X className="h-4 w-4" />
                            )}
                          </>
                        )}
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Study Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-accent/10 mr-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{studyStats.totalHours}h</p>
              <p className="text-sm text-muted-foreground">Total Study Time</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-primary/10 mr-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {studyStats.totalHours}/{studyStats.weeklyGoal}h
              </p>
              <p className="text-sm text-muted-foreground">Weekly Goal</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-primary/10 mr-4">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{studyStats.completedCourses}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-accent/10 mr-4">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{studyStats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Materials */}
        <div className="lg:col-span-2">
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">Study Materials</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyMaterials.map((material) => (
                  <div 
                    key={material.id}
                    className="p-4 rounded-lg border border-border hover:shadow-sm transition-all bg-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{material.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {material.duration}
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {material.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getDifficultyColor(material.difficulty)}`}>
                        {material.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-accent">{material.progress}%</span>
                      </div>
                      <Progress value={material.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between mt-3">
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Continue
                      </Button>
                      {material.progress > 50 && (
                        <Button size="sm" variant="outline">
                          <Brain className="h-3 w-3 mr-1" />
                          Quiz
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Session & Progress */}
        <div className="space-y-6">
          {/* Study Timer */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Focus Session
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-foreground">
                {Math.floor(studyTime / 60).toString().padStart(2, '0')}:
                {(studyTime % 60).toString().padStart(2, '0')}
              </div>
              
              <Button
                onClick={() => setIsStudying(!isStudying)}
                className={isStudying ? "bg-destructive hover:bg-destructive/90" : "gradient-primary"}
              >
                {isStudying ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-2" />
                    Pause Session
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Focus
                  </>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                {isStudying ? "Stay focused! You're doing great." : "Ready to learn something new?"}
              </p>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Weekly Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-accent">
                    {Math.round((studyStats.totalHours / studyStats.weeklyGoal) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(studyStats.totalHours / studyStats.weeklyGoal) * 100} 
                  className="h-3"
                />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {studyStats.weeklyGoal - studyStats.totalHours} hours remaining
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cortex Motivation */}
          <Card className="gradient-card border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img src={CortexMascot} alt="Cortex" className="w-12 h-12" />
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    Great progress! 🎉
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You're {studyStats.currentStreak} days into your study streak. 
                    Keep up the momentum!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};