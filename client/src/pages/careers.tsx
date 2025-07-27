import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Briefcase } from "lucide-react";

const careers = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Join our engineering team to build the next generation of e-commerce solutions.",
    requirements: ["5+ years experience", "React/Node.js", "PostgreSQL", "TypeScript"],
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Lead product strategy and development for our vendor management platform.",
    requirements: ["3+ years PM experience", "E-commerce background", "Data-driven mindset"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design beautiful and intuitive user experiences for our marketplace platform.",
    requirements: ["Portfolio showcasing design work", "Figma/Sketch proficiency", "User research experience"],
  },
  {
    id: 4,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "New York, NY",
    type: "Full-time",
    description: "Help our vendors succeed by providing exceptional support and guidance.",
    requirements: ["Customer-facing experience", "Strong communication skills", "Problem-solving mindset"],
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're building the future of e-commerce. Join our mission to empower vendors and create 
            amazing shopping experiences for customers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span>50+ Team Members</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>Remote-First Culture</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-5 w-5" />
              <span>Competitive Benefits</span>
            </div>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Amazing Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                Work with talented, passionate people who care about building great products and supporting each other.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Remote Flexibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                Work from anywhere with flexible hours. We believe in work-life balance and trust our team.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Growth Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                Continuous learning budget, mentorship programs, and clear career progression paths.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {careers.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                        <Badge variant="secondary">{job.department}</Badge>
                      </CardDescription>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Don't See a Perfect Fit?</CardTitle>
              <CardDescription>
                We're always looking for talented people to join our team. Send us your resume and tell us how you'd like to contribute.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg">
                Send Us Your Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}