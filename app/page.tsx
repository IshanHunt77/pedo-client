import FileUpload from '@/components/file-upload';
import { HomeComponent } from '@/components/HomeCompont';

export default function Home() {
  return (
    <>
    <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background from Bottom */}
  
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
    }}
  />
     {/* Your Content/Components */}
      <HomeComponent/>
  
</div>
  {/* Your Content/Components */}


    </>
  );
}
