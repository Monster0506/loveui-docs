import { LoginForm } from "../components/login-form";
import { GradientMesh } from "../components/gradient-mesh";
import { WordmarkIcon } from "../components/logo";
export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
         <WordmarkIcon className="mr-auto h-5" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
       <GradientMesh
        colors={["#ffffff", "#000000", "#000000"]}
        distortion={3}
        swirl={0.5}
        speed={1} 
        rotation={90}
        waveAmp={0.1}
        waveFreq={7}
        waveSpeed={0.2}
        grain={0.06}
      />
      </div>
    </div>
  );
}
