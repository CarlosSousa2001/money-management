'use client';

import { Github, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const developers = [
  {
    name: 'Carlos Sousa',
    role: 'Frontend Developer',
    github: 'https://github.com/CarlosSousa2001',
    linkedin: 'https://www.linkedin.com/in/carlossousadev/',
    avatarUrl: '',
  },
  {
    name: 'Gabriel Anselmo',
    role: 'Backend Developer',
    github: 'https://www.linkedin.com/in/gabrielanselmoa/',
    linkedin: 'https://www.linkedin.com/in/gabrielanselmoa/',
    avatarUrl: '',
  },
];

export default function HelpDevLinks() {
  return (
    <section className="">
      <h3 className="text-xl font-semibold mb-6">Conheça os Desenvolvedores</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl"
          >
            <Avatar className="w-14 h-14">
              {dev.avatarUrl ? (
                <AvatarImage src={dev.avatarUrl} alt={dev.name} />
              ) : (
                <AvatarFallback>{dev.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-base text-blue-400 hover:underline"
              >
                {dev.name}
              </a>
              <span className="text-sm text-muted-foreground">{dev.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
