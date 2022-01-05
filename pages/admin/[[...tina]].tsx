import dynamic from 'next/dynamic';

const TinaAdmin = dynamic(() => import('tinacms').then((module) => module.TinaAdmin));

export default TinaAdmin;
