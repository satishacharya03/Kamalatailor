import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./general-settings";
import { SecuritySettings } from "./security-settings";
import { NotificationSettings } from "./notification-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your store settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <GeneralSettings />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <SecuritySettings />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <NotificationSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}