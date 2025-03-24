import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">

          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute -left-1/6 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute -right-1/6 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
            />
          </div>

          <div className="container relative z-[3] px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mx-auto max-w-3xl space-y-8"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Build Faster with Flash React
              </h1>
              <p className="mx-auto max-w-3xl text-gray-400 sm:text-xl leading-relaxed">
                At a flash, you're all set with a preconfigured boilerplate of
                Vite + React, Tailwind CSS, Redux, ShadCN UI, and React Router
                Dom — supported for both JavaScript and TypeScript. Just{" "}
                <code className="border bg-gray-900 p-1 rounded border-dashed border-gray-600">
                  {" "}
                  Ctrl + C
                </code>{" "}
                &{" "}
                <code className="border bg-gray-900 p-1 border-dashed rounded border-gray-600">
                  {" "}
                  Ctrl + V{" "}
                </code>
                <br />
                <code className="block border bg-gray-900 p-1 rounded border-dashed border-gray-600 mt-2">
                npx flash_create {"<project_name>"}
                </code>
                and you're in the code cosmos.
              </p>

              <div className="flex justify-center space-x-4">
                <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-lg bg-transperent text-white hover:bg-transparent hover:text-white "
                >
                  Happy Hacking
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}

export default App;
