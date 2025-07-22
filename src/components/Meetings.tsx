import { useState } from "react";
import { 
  Video, 
  Search, 
  Filter,
  Play,
  Download,
  Calendar,
  Clock,
  Users,
  Tag,
  Star,
  Archive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const meetings = [
  {
    id: 1,
    title: "Q1 Strategy Planning",
    date: "2024-01-18",
    duration: "1h 30m",
    participants: ["John Doe", "Jane Smith", "Mike Wilson", "Sarah Johnson"],
    tags: ["strategy", "planning", "quarterly"],
    type: "internal",
    recording: "https://example.com/recording1",
    notes: "Discussed Q1 goals, budget allocation, and team restructuring.",
    starred: true
  },
  {
    id: 2,
    title: "Client Onboarding Review",
    date: "2024-01-17",
    duration: "45m",
    participants: ["Alice Brown", "Bob Davis", "Carol White"],
    tags: ["client", "onboarding", "review"],
    type: "external",
    recording: "https://example.com/recording2",
    notes: "Reviewed onboarding process improvements and client feedback.",
    starred: false
  },
  {
    id: 3,
    title: "Weekly Team Standup",
    date: "2024-01-16",
    duration: "30m",
    participants: ["Dev Team", "Design Team", "QA Team"],
    tags: ["standup", "weekly", "development"],
    type: "internal",
    recording: "https://example.com/recording3",
    notes: "Sprint progress update, blocker discussions, upcoming deliverables.",
    starred: true
  },
  {
    id: 4,
    title: "Product Demo Session",
    date: "2024-01-15",
    duration: "2h",
    participants: ["Product Team", "Sales Team", "Marketing"],
    tags: ["demo", "product", "presentation"],
    type: "internal",
    recording: "https://example.com/recording4",
    notes: "Demonstrated new features, gathered feedback, discussed go-to-market strategy.",
    starred: false
  }
];

const allTags = Array.from(new Set(meetings.flatMap(m => m.tags)));

export const Meetings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         meeting.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === "all" || meeting.tags.includes(selectedTag);
    const matchesType = filterType === "all" || meeting.type === filterType;
    const matchesStarred = !showStarredOnly || meeting.starred;

    return matchesSearch && matchesTag && matchesType && matchesStarred;
  });

  const toggleStar = (meetingId: number) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting) {
      meeting.starred = !meeting.starred;
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      "bg-primary/10 text-primary border-primary/20",
      "bg-accent/10 text-accent border-accent/20",
      "bg-secondary/10 text-secondary border-secondary/20",
      "bg-muted text-muted-foreground border-border"
    ];
    return colors[tag.length % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Meeting Library 🎥
          </h1>
          <p className="text-muted-foreground">
            Your archive of recorded meetings with searchable content
          </p>
        </div>
        <Button className="gradient-primary hover-lift">
          <Video className="h-4 w-4 mr-2" />
          New Recording
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="gradient-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meetings, participants, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showStarredOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowStarredOnly(!showStarredOnly)}
              >
                <Star className={`h-4 w-4 ${showStarredOnly ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meeting Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-secondary/10 mr-4">
              <Archive className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{meetings.length}</p>
              <p className="text-sm text-muted-foreground">Total Meetings</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-primary/10 mr-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12.5h</p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-accent/10 mr-4">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Participants</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-primary/10 mr-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {meetings.filter(m => m.starred).length}
              </p>
              <p className="text-sm text-muted-foreground">Starred</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id} className="gradient-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold mb-2">
                    {meeting.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meeting.duration}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={meeting.type === "internal" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {meeting.type}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStar(meeting.id)}
                  >
                    <Star className={`h-4 w-4 ${meeting.starred ? 'fill-current text-accent' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Participants */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Participants</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {meeting.participants.slice(0, 3).map((participant, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {participant}
                    </Badge>
                  ))}
                  {meeting.participants.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{meeting.participants.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Tag className="h-3 w-3 text-primary" />
                  <span className="text-sm text-muted-foreground">Tags</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {meeting.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      className={`text-xs border ${getTagColor(tag)}`}
                      variant="outline"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Notes</p>
                <p className="text-sm text-foreground line-clamp-2">
                  {meeting.notes}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Play className="h-3 w-3 mr-1" />
                  Watch
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <Card className="gradient-card">
          <CardContent className="text-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No meetings found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};