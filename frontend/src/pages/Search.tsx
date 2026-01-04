import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUploader } from "@/components/search/ImageUploader";
import { UploadedImagePreview } from "@/components/search/UploadedImagePreview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search as SearchIcon, Sparkles, Heart } from "lucide-react";

interface SearchResult {
  url: string;
  category: string;
  similarity?: number;
}

export default function Search() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [similarProducts, setSimilarProducts] = useState<SearchResult[]>([]);
  const [recommendations, setRecommendations] = useState<SearchResult[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImagesSelect = (urls: string[]) => {
    if (urls.length > 0) {
      // For demo purposes, categorize the results
      // In a real app, the backend would return categorized results
      const categorized = urls.map((url, index) => ({
        url,
        category: url.split('/')[1], // Extract category from path
        similarity: Math.random() // Mock similarity score
      }));

      // Split results into categories (this is a demo logic)
      const searchResults = categorized.slice(0, Math.ceil(categorized.length / 3));
      const similarProducts = categorized.slice(Math.ceil(categorized.length / 3), Math.ceil(2 * categorized.length / 3));
      const recommendations = categorized.slice(Math.ceil(2 * categorized.length / 3));

      setSearchResults(searchResults);
      setSimilarProducts(similarProducts);
      setRecommendations(recommendations);

      // Set the first image as the uploaded image preview
      if (urls.length > 0) {
        setUploadedImage(urls[0]);
      }
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSimilarProducts([]);
    setRecommendations([]);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <SearchIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">VisualSearch</span>
                <Badge variant="secondary">Demo</Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Visual Product Search
            </h1>
            <p className="text-slate-600">
              Upload an image to find similar products and get personalized recommendations
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ImageUploader onImagesSelect={handleImagesSelect} />
          </div>
        </div>

        {/* Results Section */}
        {(searchResults.length > 0 || similarProducts.length > 0 || recommendations.length > 0) && (
          <div className="space-y-8">
            {/* Uploaded Image Preview */}
            {uploadedImage && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Uploaded Image</h3>
                <div className="flex justify-center">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-w-xs max-h-64 object-contain rounded-lg border border-slate-200"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={clearResults}>
                    Clear Results
                  </Button>
                </div>
              </div>
            )}

            {/* Results Tabs */}
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="search" className="flex items-center space-x-2">
                  <SearchIcon className="w-4 h-4" />
                  <span>Search Results</span>
                  {searchResults.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {searchResults.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="similar" className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Similar Products</span>
                  {similarProducts.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {similarProducts.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="recommended" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Recommended</span>
                  {recommendations.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {recommendations.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Search Results</h3>
                  <p className="text-slate-600 mb-6">
                    Products most similar to your uploaded image
                  </p>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {searchResults.map((result, idx) => (
                        <div key={idx} className="group">
                          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:shadow-lg transition-shadow">
                            <img
                              src={result.url}
                              alt={`Search result ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-medium text-slate-900 capitalize">
                              {result.category.replace(/_/g, ' ')}
                            </p>
                            {result.similarity && (
                              <p className="text-xs text-slate-500">
                                Similarity: {(result.similarity * 100).toFixed(1)}%
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <SearchIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500">No search results found</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="similar" className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Similar Products</h3>
                  <p className="text-slate-600 mb-6">
                    Products from the same category with similar features
                  </p>
                  {similarProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {similarProducts.map((result, idx) => (
                        <div key={idx} className="group">
                          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:shadow-lg transition-shadow">
                            <img
                              src={result.url}
                              alt={`Similar product ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-medium text-slate-900 capitalize">
                              {result.category.replace(/_/g, ' ')}
                            </p>
                            {result.similarity && (
                              <p className="text-xs text-slate-500">
                                Similarity: {(result.similarity * 100).toFixed(1)}%
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500">No similar products found</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Recommended For You</h3>
                  <p className="text-slate-600 mb-6">
                    Personalized recommendations based on your search
                  </p>
                  {recommendations.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {recommendations.map((result, idx) => (
                        <div key={idx} className="group">
                          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:shadow-lg transition-shadow">
                            <img
                              src={result.url}
                              alt={`Recommendation ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-medium text-slate-900 capitalize">
                              {result.category.replace(/_/g, ' ')}
                            </p>
                            {result.similarity && (
                              <p className="text-xs text-slate-500">
                                Relevance: {(result.similarity * 100).toFixed(1)}%
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500">No recommendations available</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && similarProducts.length === 0 && recommendations.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="w-12 h-12 text-slate-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  Ready to Search?
                </h3>
                <p className="text-slate-600">
                  Upload an image above to find similar products and get personalized recommendations powered by AI.
                </p>
              </div>
              <div className="flex justify-center space-x-4 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>AI-Powered Search</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Smart Recommendations</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
