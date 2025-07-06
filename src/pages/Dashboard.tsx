
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Layout, Database } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-corporate-black mb-2">
          Dashboard
        </h1>
        <p className="text-corporate-gray-medium">
          Pregled sistema za upravljanje dokumentima
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Grupe</span>
            </CardTitle>
            <CardDescription>
              Upravljanje grupama dokumenata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/groups">
              <Button className="w-full">Otvori Grupe</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layout className="h-5 w-5" />
              <span>Sekcije</span>
            </CardTitle>
            <CardDescription>
              Upravljanje sekcijama dokumenata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/group-selection">
              <Button className="w-full">Otvori Sekcije</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Template-ovi</span>
            </CardTitle>
            <CardDescription>
              Upravljanje template-ovima dokumenata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/templates">
              <Button className="w-full">Otvori Template-ove</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Placeholders</span>
            </CardTitle>
            <CardDescription>
              Pregled svih dostupnih placeholder-a
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/placeholders">
              <Button className="w-full">Otvori Placeholders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
