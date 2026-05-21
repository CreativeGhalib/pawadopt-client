import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  HeartHandshake,
  Home as HomeIcon,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosPublic from "../api/axiosPublic";
import LoadingSpinner from "../components/LoadingSpinner";
import PetCard from "../components/PetCard";
import SectionHeader from "../components/SectionHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeaturedPets = async () => {
      try {
        const { data } = await axiosPublic.get("/pets/featured");
        setFeaturedPets(data);
      } catch (err) {
        setError(err.response?.data?.message || "Featured pets could not be loaded right now.");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPets();
  }, []);

  const whyAdopt = [
    {
      icon: HeartHandshake,
      title: "Give a second chance",
      text: "Every adoption opens space for another rescued pet to receive care, food, and safety.",
    },
    {
      icon: ShieldCheck,
      title: "Responsible matching",
      text: "Shelters and owners can review requests before approving the right forever home.",
    },
    {
      icon: HomeIcon,
      title: "Bring warmth home",
      text: "A pet can add steady companionship, daily joy, and a stronger family routine.",
    },
  ];

  const stories = [
    {
      name: "Nila and Bruno",
      story: "Bruno moved from a temporary foster home in Dhanmondi to a family with two children and a quiet garden.",
    },
    {
      name: "Rafi and Misu",
      story: "Misu was adopted after a careful request review and now spends her afternoons beside Rafi's study desk.",
    },
    {
      name: "Anika and Coco",
      story: "Coco found a patient adopter who understood senior pet care and regular vet visits.",
    },
  ];

  const tips = [
    "Prepare a calm room before bringing your pet home.",
    "Keep vaccination records and vet contacts in one place.",
    "Introduce new food slowly over several days.",
    "Use a secure collar, leash, or carrier during pickup.",
  ];

  return (
    <div className="overflow-hidden bg-surface dark:bg-slate-950">
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(253,118,26,0.14),_transparent_30%)]" />
        <div className="container-width relative grid min-h-[calc(100vh-88px)] items-center gap-12 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.45 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm dark:border-primary/30 dark:bg-slate-900">
              <Sparkles className="h-4 w-4" />
              Trusted pet adoption for caring homes in Bangladesh
            </div>

            <h1 className="font-heading text-5xl font-extrabold leading-[1.05] text-ink dark:text-white md:text-7xl">
              Find the pet who is waiting for your home.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted dark:text-slate-300">
              PawAdopt connects adopters with verified pet owners and shelters through a clear,
              secure, and caring adoption request process.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button as={Link} to="/pets" className="h-14 rounded-full bg-secondary px-8 text-base font-black text-white shadow-soft">
                Adopt Now <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                as={Link}
                to="/dashboard/add-pet"
                variant="bordered"
                className="h-14 rounded-full border-primary px-8 text-base font-black text-primary"
              >
                List a Pet
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[
                ["6+", "featured pets"],
                ["24h", "request review"],
                ["100%", "secure APIs"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-outline bg-white/75 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                  <p className="font-heading text-2xl font-extrabold text-primary">{value}</p>
                  <p className="text-xs font-semibold text-muted dark:text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-primary/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-soft dark:border-slate-900 dark:bg-slate-900">
              <img
                src="/images/banner-hero.webp"
                alt="Adoptable pets resting with their adopter"
                className="h-[420px] w-full object-cover md:h-[580px]"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/40 bg-white/80 p-5 shadow-soft backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                    <PawPrint className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-extrabold text-ink dark:text-white">Adoption made clear</p>
                    <p className="text-sm text-muted dark:text-slate-300">Browse, request, and track decisions from one place.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-width py-16">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Featured Pets"
            title="Meet pets ready for adoption"
            description="These pets are available now. Choose a profile, review details, and send an adoption request when you are ready."
          />
          <Button as={Link} to="/pets" variant="bordered" className="w-fit rounded-full border-primary px-6 font-bold text-primary">
            View All Pets <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        )}

        {!loading && !error && featuredPets.length === 0 && (
          <div className="rounded-3xl border border-dashed border-outline bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <PawPrint className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 font-heading text-2xl font-extrabold text-ink dark:text-white">No featured pets yet</h3>
            <p className="mx-auto mt-3 max-w-lg text-muted dark:text-slate-300">
              Once owners add available pets, the latest six profiles will appear here.
            </p>
          </div>
        )}

        {!loading && !error && featuredPets.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPets.slice(0, 6).map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container-width">
          <SectionHeader
            centered
            eyebrow="Why Adopt"
            title="A kinder way to grow your family"
            description="Adoption is practical, compassionate, and life-changing when the process is transparent."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyAdopt.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-outline bg-surface p-6 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-300">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-width grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Success Stories"
          title="Real matches, calmer homes"
          description="PawAdopt is built around careful requests and owner approval, so every adoption can start with trust."
        />
        <div className="grid gap-4">
          {stories.map((story) => (
            <div key={story.name} className="rounded-3xl border border-outline bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="font-heading text-xl font-extrabold text-primary">{story.name}</h3>
              <p className="mt-2 leading-7 text-muted dark:text-slate-300">{story.story}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-low py-16 dark:bg-slate-900/60">
        <div className="container-width grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border-8 border-white shadow-soft dark:border-slate-900">
            <img
              src="/images/success-story.webp"
              alt="Pet care supplies and calm indoor pet setup"
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="Pet Care Tips"
              title="Start adoption day with a simple care plan"
              description="A little preparation keeps the first week calm for both adopter and pet."
            />
            <div className="mt-7 grid gap-3">
              {tips.map((tip) => (
                <div key={tip} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-950">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-muted dark:text-slate-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-width grid gap-6 py-16 md:grid-cols-2">
        <div className="rounded-[2rem] bg-primary p-8 text-white shadow-soft">
          <CalendarCheck className="h-10 w-10" />
          <h2 className="mt-5 font-heading text-3xl font-extrabold">Adoption request timeline</h2>
          <p className="mt-4 leading-7 text-white/85">
            Send a pickup date and message, then track whether the owner approves or rejects your request.
          </p>
        </div>
        <div className="rounded-[2rem] bg-secondary p-8 text-white shadow-soft">
          <ShieldCheck className="h-10 w-10" />
          <h2 className="mt-5 font-heading text-3xl font-extrabold">Shelter and owner controls</h2>
          <p className="mt-4 leading-7 text-white/90">
            Owners can review all requests, approve one adopter, and keep adopted pets protected from future requests.
          </p>
        </div>
      </section>

      {/* How It Works — extra static section */}
      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container-width">
          <SectionHeader
            eyebrow="How It Works"
            title="Three steps to a new companion"
            description="Adopting a pet through PawAdopt is straightforward. Browse, request, and welcome your new family member home."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Browse available pets",
                body: "Search and filter our listings by name, species, or adoption fee to find a pet that suits your home.",
              },
              {
                step: "02",
                title: "Submit an adoption request",
                body: "Choose a pickup date, write a short message, and send your request directly to the pet owner or shelter.",
              },
              {
                step: "03",
                title: "Get approved and adopt",
                body: "The owner reviews your request and approves the best match. Once approved, coordinate pickup and bring your pet home.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="relative rounded-3xl border border-outline bg-surface p-7 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <span className="font-heading text-5xl font-extrabold text-primary/15 dark:text-primary/20">
                  {step}
                </span>
                <h3 className="mt-2 font-heading text-xl font-extrabold text-ink dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted dark:text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
