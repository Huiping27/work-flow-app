import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap } from 'react-flow-renderer';

function App() {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Step 1' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Step 2' }, position: { x: 400, y: 100 } },
    { id: '4', type: 'output', data: { label: 'End' }, position: { x: 250, y: 200 } },
  ]);

  const [edges, setEdges] = useState([
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
  ]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => nds.map((node) => {
      const change = changes.find((c) => c.id === node.id);
      return change ? { ...node, ...change } : node;
    })),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => eds.map((edge) => {
      const change = changes.find((c) => c.id === edge.id);
      return change ? { ...edge, ...change } : edge;
    })),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const updateLabel = (nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;



