import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Palette,
  Clock,
  Shield,
  Database,
  HelpCircle,
  LogOut,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import CortexMascot from "@/assets/cortex-mascot.png";

interface SettingsState {
  profile: {
    name: string;
    email: string;
    timezone: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    taskReminders: boolean;
    meetingAlerts: boolean;
  };
  preferences: {
    theme: string;
    language: string;
    workingHours: {
      start: string;
      end: string;
    };
  };
  privacy: {
    profileVisibility: string;
    dataSharing: boolean;
    analytics: boolean;
  };
}

export const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    profile: {
      name: "Alex Johnson",
      email: "alex@mindhub.com",
      timezone: "America/New_York"
    },
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      meetingAlerts: true
    },
    preferences: {
      theme: "light",
      language: "en",
      workingHours: {
        start: "09:00",
        end: "17:00"
      }
    },
    privacy: {
      profileVisibility: "team",
      dataSharing: false,
      analytics: true
    }
  });

  const updateSettings = (section: keyof SettingsState, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateNestedSettings = (section: keyof SettingsState, nested: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nested]: {
          ...(prev[section] as any)[nested],
          [key]: value
        }
      }
    }));
  };

  const saveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const settingSections = [
    {
      title: "Profile Settings",
      icon: User,
      description: "Manage your account information"
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Configure your notification preferences"
    },
    {
      title: "Preferences",
      icon: Palette,
      description: "Customize your MindHub experience"
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      description: "Control your data and privacy settings"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Settings ⚙️
          </h1>
          <p className="text-muted-foreground">
            Customize your MindHub experience
          </p>
        </div>
        <Button onClick={saveSettings} className="gradient-primary hover-lift">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1 gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {settingSections.map((section, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <section.icon className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{section.title}</p>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <Separator className="my-4" />

            {/* Cortex Helper */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <img src={CortexMascot} alt="Cortex" className="w-8 h-8" />
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    Need Help?
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    I'm here to guide you through the settings!
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) => updateSettings('profile', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => updateSettings('profile', 'email', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={settings.profile.timezone}
                  onValueChange={(value) => updateSettings('profile', 'timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => updateSettings('notifications', 'email', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get browser push notifications</p>
                </div>
                <Switch 
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => updateSettings('notifications', 'push', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="task-reminders">Task Reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders for upcoming tasks</p>
                </div>
                <Switch 
                  id="task-reminders"
                  checked={settings.notifications.taskReminders}
                  onCheckedChange={(checked) => updateSettings('notifications', 'taskReminders', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="meeting-alerts">Meeting Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alerts before meetings start</p>
                </div>
                <Switch 
                  id="meeting-alerts"
                  checked={settings.notifications.meetingAlerts}
                  onCheckedChange={(checked) => updateSettings('notifications', 'meetingAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={settings.preferences.theme}
                    onValueChange={(value) => updateSettings('preferences', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={settings.preferences.language}
                    onValueChange={(value) => updateSettings('preferences', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4" />
                  Working Hours
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work-start" className="text-sm text-muted-foreground">Start Time</Label>
                    <Input 
                      id="work-start"
                      type="time"
                      value={settings.preferences.workingHours.start}
                      onChange={(e) => updateNestedSettings('preferences', 'workingHours', 'start', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="work-end" className="text-sm text-muted-foreground">End Time</Label>
                    <Input 
                      id="work-end"
                      type="time"
                      value={settings.preferences.workingHours.end}
                      onChange={(e) => updateNestedSettings('preferences', 'workingHours', 'end', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <Select 
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) => updateSettings('privacy', 'profileVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="team">Team Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share anonymized data for improvements</p>
                </div>
                <Switch 
                  id="data-sharing"
                  checked={settings.privacy.dataSharing}
                  onCheckedChange={(checked) => updateSettings('privacy', 'dataSharing', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve MindHub with usage data</p>
                </div>
                <Switch 
                  id="analytics"
                  checked={settings.privacy.analytics}
                  onCheckedChange={(checked) => updateSettings('privacy', 'analytics', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20 gradient-card">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Export Data</p>
                  <p className="text-sm text-muted-foreground">Download all your data</p>
                </div>
                <Button variant="outline" size="sm">
                  <Database className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Sign Out</p>
                  <p className="text-sm text-muted-foreground">Sign out from all devices</p>
                </div>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-destructive">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};