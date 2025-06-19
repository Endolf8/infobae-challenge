'use client';

import Loading from '@/common/components/Loading';
import GeneratorView from '@/views/GeneratorView';
import { Suspense } from 'react';

const GeneratorPage = () => {
  return (
    <Suspense fallback={<Loading title="Cargando..." />}>
      <GeneratorView />
    </Suspense>
  );
};

export default GeneratorPage;
