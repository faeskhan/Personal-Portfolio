import React from 'react'
import { motion } from 'framer-motion'

export const EducationItem = ({ degree, school, year, description }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-md"
  >
    <h3 className="text-xl font-semibold mb-2 text-pink-400">{degree}</h3>
    <p className="text-violet-400 mb-2">{school}</p>
    <p className="text-gray-400 mb-2">{year}</p>
    <p className="text-gray-300">{description}</p>
  </motion.div>
) 