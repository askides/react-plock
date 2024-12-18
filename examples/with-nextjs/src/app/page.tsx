'use client';

import { images } from '@assets/data/images';
import { Masonry } from '@local/lib';
import { Button } from './ui/Button';
import { useState } from 'react';

const items = [
  { height: 600, color: '#D32F2F', id: 1 }, // Extra Tall - Darker Red
  { height: 200, color: '#00796B', id: 2 }, // Short - Darker Teal
  { height: 400, color: '#1976D2', id: 3 }, // Tall - Darker Blue
  { height: 300, color: '#2E7D32', id: 4 }, // Medium - Darker Green
  { height: 500, color: '#F57F17', id: 5 }, // Very Tall - Darker Yellow
  { height: 250, color: '#C2185B', id: 6 }, // Medium-Short - Darker Pink
  { height: 450, color: '#4527A0', id: 7 }, // Tall - Darker Purple
  { height: 200, color: '#1565C0', id: 8 }, // Short - Darker Blue
  { height: 350, color: '#D84315', id: 9 }, // Medium-Tall - Darker Orange
  { height: 550, color: '#1B5E20', id: 10 }, // Very Tall - Darker Green
  { height: 150, color: '#B71C1C', id: 11 }, // Very Short - Darker Red
  { height: 400, color: '#311B92', id: 12 }, // Tall - Darker Purple
  { height: 300, color: '#00695C', id: 13 }, // Medium - Darker Turquoise
  { height: 250, color: '#E65100', id: 14 }, // Medium-Short - Darker Orange
  { height: 500, color: '#880E4F', id: 15 }, // Very Tall - Darker Pink
  { height: 200, color: '#0D47A1', id: 16 }, // Short - Darker Blue
  { height: 450, color: '#3E2723', id: 17 }, // Tall - Darker Brown
  { height: 350, color: '#4A148C', id: 18 }, // Medium-Tall - Darker Purple
  { height: 500, color: '#01579B', id: 19 }, // Medium - Darker Blue
  { height: 400, color: '#AD1457', id: 20 }, // Tall - Darker Pink
  { height: 300, color: '#E65100', id: 21 }, // Medium-Short - Darker Orange
];

export default function Home() {
  const [isBalanced, setIsBalanced] = useState(false);

  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui' }}>
      <fieldset style={{ padding: 16 }}>
        <legend>Settings</legend>

        <Button onClick={() => setIsBalanced(!isBalanced)}>
          {isBalanced ? 'Balanced Layout' : 'Default Layout'}
        </Button>
      </fieldset>

      <div style={{ paddingTop: '16px' }} />

      <Masonry
        items={items}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 6],
          media: [640, 1024, 1280],
          useBalancedLayout: isBalanced,
        }}
        render={(item) => (
          <div
            style={{
              height: item.height,
              backgroundColor: item.color,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          >
            {`${item.height}px - #${item.id}`}
          </div>
        )}
      />
    </div>
  );
}
