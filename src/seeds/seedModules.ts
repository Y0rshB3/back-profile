import { AppDataSource } from "../config/typeormConfig";
import { Module } from "../models/modules";

export async function seedModules() {
  const modules = [
    // skills
    {
      name: "skills",
      status: "active",
      language: "EN",
    },
    {
      name: "habilidades",
      status: "active",
      language: "ES",
    },
    // experience
    {
      name: "experience",
      status: "active",
      language: "EN",
    },
    {
      name: "experiencia",
      status: "active",
      language: "ES",
    },
    // projects
    {
      name: "projects",
      status: "active",
      language: "EN",
    },
    {
      name: "proyectos",
      status: "active",
      language: "ES",
    },
    // education
    {
      name: "education",
      status: "active",
      language: "EN",
    },
    {
      name: "educacion",
      status: "active",
      language: "ES",
    },
    // blog
    {
      name: "blog",
      status: "active",
      language: "EN",
    },
    {
      name: "blog",
      status: "active",
      language: "ES",
    }
  ];
  // TODO: check if modules already exist
};