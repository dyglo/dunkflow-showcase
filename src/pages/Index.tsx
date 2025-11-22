import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Placeholder for future sections */}
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-inter text-lg">More sections coming soon...</p>
      </div>
    </div>
  );
};

export default Index;
