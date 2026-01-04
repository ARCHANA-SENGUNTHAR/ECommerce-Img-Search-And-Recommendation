import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Search,
  Brain,
  ShoppingBag,
  Zap,
  Globe,
  Camera,
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Visual Search",
      description: "Find products using images instead of text search"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Similarity Matching",
      description: "Uses deep learning + FAISS for fast, accurate results"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Smart Recommendations",
      description: "Suggests complementary & trending products"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Scalable Backend",
      description: "Built with FastAPI, PyTorch, and FAISS"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Modern Frontend",
      description: "React + Tailwind UI for smooth experience"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Instant results with advanced AI algorithms"
    }
  ];

  const steps = [
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Upload an Image",
      description: "Take a photo or upload a product image from your device"
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI Understands the Image",
      description: "Deep learning extracts visual features like color, shape, and style"
    },
    {
      icon: <ShoppingBag className="w-12 h-12" />,
      title: "Get Similar Products & Recommendations",
      description: "See visually similar products and personalized suggestions instantly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">VisualSearch</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" onClick={() => navigate('/search')}>
                Try Demo
              </Button>
              <Button onClick={() => navigate('/search')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-3 py-1">
                  🚀 Powered by AI & Computer Vision
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Search Products Using
                  <span className="text-blue-600 block">Images, Not Words</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-lg">
                  Upload a product image and instantly find similar items with smart recommendations powered by AI.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                  onClick={() => navigate('/search')}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                  onClick={() => navigate('/search')}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Try Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant results</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="space-y-6">
                  {/* Upload Box Mockup */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Drop your image here</p>
                    <p className="text-slate-400 text-sm">or click to browse</p>
                  </div>

                  {/* Results Grid Mockup */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple, magical, and incredibly powerful. Find exactly what you're looking for in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-blue-600">
                    {step.icon}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built with cutting-edge AI technology for the best visual search experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Experience Visual Search?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Try our live demo and see how AI-powered visual search can transform your shopping experience.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4 h-auto bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => navigate('/search')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Try Live Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">VisualSearch</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 VisualSearch. Built with AI & Computer Vision.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
