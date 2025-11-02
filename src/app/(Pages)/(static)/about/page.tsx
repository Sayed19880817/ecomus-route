import React from "react";
import {
  ShoppingBag,
  Users,
  Globe,
  Award,
  Truck,
  Shield,
  Heart,
  Star,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Target,
  Eye,
  Zap,
  Quote,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

export default function AboutEcommercePage() {
  const stats: Stat[] = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "2M+",
      label: "Happy Customers",
      color: "text-blue-600",
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      value: "10M+",
      label: "Products Sold",
      color: "text-green-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "50+",
      label: "Countries Served",
      color: "text-purple-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "15+",
      label: "Years Experience",
      color: "text-orange-600",
    },
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12 text-blue-600" />,
      title: "Customer First",
      description:
        "Every decision we make starts with asking: how does this benefit our customers? We're committed to providing exceptional service and products that exceed expectations.",
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: "Trust & Security",
      description:
        "Your trust is our foundation. We implement the highest security standards and maintain transparency in all our business practices to ensure your peace of mind.",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: "Innovation",
      description:
        "We constantly evolve and adapt to new technologies and trends to bring you the latest and best shopping experience possible.",
    },
    {
      icon: <Heart className="w-12 h-12 text-red-600" />,
      title: "Sustainability",
      description:
        "We're committed to making a positive impact on the world through sustainable practices and responsible business decisions.",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "15+ years in e-commerce, passionate about customer experience",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Tech visionary with expertise in scalable platforms",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Marketing",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Creative strategist focused on brand growth and engagement",
    },
    {
      name: "David Kim",
      role: "Operations Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Supply chain expert ensuring smooth global operations",
    },
  ];

  const milestones: Milestone[] = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Started as a small online store with big dreams",
    },
    {
      year: "2012",
      title: "First Million Customers",
      description: "Reached our first major milestone in customer growth",
    },
    {
      year: "2015",
      title: "Global Expansion",
      description: "Launched international shipping to 25 countries",
    },
    {
      year: "2018",
      title: "Mobile First",
      description: "Rebuilt platform with mobile-first approach",
    },
    {
      year: "2021",
      title: "Sustainability Initiative",
      description: "Launched carbon-neutral shipping program",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Implemented AI-powered personalization",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container relative mx-auto px-4 md:px-2 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm px-4 py-2">
                  About Ecomus
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Revolutionizing
                  </span>
                  <br />
                  E-commerce Experience
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Since 2009, we&apos;ve been dedicated to bringing you the
                  latest technology products with exceptional service,
                  competitive prices, and a seamless shopping experience that
                  puts customers first.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12"
                >
                  <Link href={"/products"}>
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12">
                  Our Story
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
                  alt="E-commerce team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-card shadow-lg rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-card shadow-lg rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4 ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re driven by a simple belief: technology should enhance
              lives, not complicate them.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-600 rounded-full">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To democratize access to cutting-edge technology by providing
                  high-quality products, exceptional customer service, and
                  innovative shopping experiences that empower people to achieve
                  their goals and enhance their daily lives.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-600 rounded-full">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To become the world&apos;s most trusted technology
                  marketplace, where innovation meets accessibility, and where
                  every customer feels confident in their technology choices,
                  knowing they&apos;re supported by a team that truly cares.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do and shape the way we serve
              our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{value.icon}</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to global reach - here&apos;s how
              we&apos;ve grown over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-background z-10" />

                  <div
                    className={`flex-1 pl-12 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <Card className="p-6 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-0">
                        <div
                          className={`text-center ${
                            index % 2 === 0 ? "md:text-right" : "md:text-left"
                          }`}
                        >
                          <Badge className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {milestone.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate people behind TechStore who make it all possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonial */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardContent className="p-0">
              <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <blockquote className="text-2xl lg:text-3xl font-bold leading-relaxed mb-6">
                &quot;Ecomus has been our go-to for all technology needs. Their
                customer service is exceptional, and the product quality is
                always top-notch. Highly recommended!&quot;
              </blockquote>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="text-lg">
                <p className="font-semibold">Jessica Thompson</p>
                <p className="text-muted-foreground">Verified Customer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Let&apos;s Connect
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Have questions or want to learn more about our company? We&apos;d
              love to hear from you and start a conversation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 h-12"
              >
                <Link href={"/contact"}>
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white/10 h-12"
              >
                <Link href={"/contact"}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Link>
              </Button>
            </div>

            <div className="flex justify-center items-center gap-8 pt-8 text-sm opacity-75">
              <div>
                <Link
                  href={"https://maps.app.goo.gl/dn6t3gJv7YcCFoSa9"}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> <span>Tanta, Egypt</span>
                </Link>
              </div>
              <div>
                <Link
                  href={"mailto:ibrahimqutb112@gmail.com"}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>ibrahimqutb112@gmail.com</span>
                </Link>
              </div>
              <div>
                <Link
                  href={"tel:00201098813635"}
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>+2 (010) 98813635</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
