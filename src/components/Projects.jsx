import React, { useEffect, useState } from "react";
import { assets, projectsData } from "../assets/assets";
import { motion } from "framer-motion";


const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(1);

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth >= 1024) {
                setCardsToShow(4);
            } else {
                setCardsToShow(1);
            }
        };

        updateCardsToShow();
        window.addEventListener("resize", updateCardsToShow);
        return () => window.removeEventListener("resize", updateCardsToShow);
    }, []);

    const nextProject = () => {
        const maxIndex = projectsData.length - cardsToShow;
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    };

    const prevProject = () => {
        const maxIndex = projectsData.length - cardsToShow;
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

    return (
        <motion.div 
        initial={{opacity: 0, x:-200}}
            transition={{duration: 1}}
            whileInView={{opacity:1, x:0}}
            viewport={{once: true}}
        
        
        id="Projects" className="scroll-mt-24 pt-24 bg-white">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
                Projects{" "}
                <span className="underline underline-offset-4 decoration-1 font-light">
                    Completed
                </span>
            </h1>
            <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
                Crafting Spaces, Building Legacies—Explore Our Portfolio
            </p>

            {/* Slider Buttons */}
            <div className="flex justify-end items-center mb-4">
                <button
                    onClick={prevProject}
                    className="p-3 bg-gray-200 rounded mr-2"
                    aria-label="Previous Project"
                >
                    <img src={assets.left_arrow} alt="Previous" />
                </button>
                <button
                    onClick={nextProject}
                    className="p-3 bg-gray-200 rounded"
                    aria-label="Next Project"
                >
                    <img src={assets.right_arrow} alt="Next" />
                </button>
            </div>

            {/* Slider */}
            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        width: `${(projectsData.length * 100) / cardsToShow}%`,
                        transform: `translateX(-${(currentIndex * 100) / projectsData.length}%)`,
                    }}
                >
                    {projectsData.map((project, index) => (
                        <div
                            key={index}
                            className="px-2 box-border"
                            style={{
                                width: `${100 / projectsData.length}%`,
                                flexShrink: 0,
                            }}
                        >
                            <div className="w-full overflow-hidden rounded shadow-sm aspect-[4/3] lg:aspect-square">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-2 bg-white px-4 py-2 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {project.title}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {project.price} <span className='px-1'></span> {project.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
