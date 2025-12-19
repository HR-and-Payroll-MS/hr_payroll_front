// src/components/org-chart/OrgChartEditor.jsx
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import CustomNodeCard from './CustomNodeCard';
import { getLayoutedElements } from './chartUtils';
import NodeModal from './NewModal';

const nodeTypes = {
  orgCard: CustomNodeCard,
};

const OrgChartEditor = ({ initialData }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLayouted, setIsLayouted] = useState(false);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetParentId, setTargetParentId] = useState(null);

  // --- Actions ---

  // 1. Triggered when user clicks "+" on a card
  const onAddClick = useCallback((parentId) => {
    setTargetParentId(parentId); // Remember who we are adding to
    setIsModalOpen(true);        // Open the popup
  }, []);

  // 2. Triggered when user submits the Modal Form
  const handleModalSubmit = (formData, parentId) => {
    const newNodeId = uuidv4();
    
    const newNode = {
      id: newNodeId,
      type: 'orgCard',
      data: { 
        name: formData.name,       // Use data from form
        role: formData.role,       // Use data from form
        department: formData.department, // Use data from form
        status: 'active',
        image: null, // You could add an image upload to the modal later
        onAddChild: onAddClick,    // Pass the click handler
        onDelete: onDeleteNode,
      },
      position: { x: 0, y: 0 },
    };

    const newEdge = {
      id: `${parentId}-${newNodeId}`,
      source: parentId,
      target: newNodeId,
      type: 'smoothstep',
      style: { stroke: '#cbd5e1' },
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => addEdge(newEdge, eds));
    setIsLayouted(false); // Trigger auto-layout
  };


  const onDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
     setIsLayouted(false);
  }, [setNodes, setEdges]);


  // --- Initialization ---

  useEffect(() => {
    if(!initialData) return;
    
    // Inject handlers into initial data
    const preparedNodes = initialData.nodes.map(node => ({
        ...node,
        data: {
            ...node.data,
            onAddChild: onAddClick, // Use the new modal trigger
            onDelete: onDeleteNode
        }
    }));

    setNodes(preparedNodes);
    setEdges(initialData.edges);
    setIsLayouted(false);
  }, [initialData, onAddClick, onDeleteNode, setNodes, setEdges]);


  // --- Layout Effect ---
  useEffect(() => {
    if (isLayouted || nodes.length === 0) return;

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      'TB'
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    setIsLayouted(true);
  }, [nodes, edges, isLayouted, setNodes, setEdges]);


  return (
    <div className="h-[600px] bg-gray-50 border rounded-xl overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={null} 
      >
        <Controls position="bottom-right" showInteractive={false} />
        <Background color="#f1f5f9" gap={16} />
      </ReactFlow>

      {/* Render the Modal here */}
      <NodeModal 
        isOpen={isModalOpen}
        parentId={targetParentId}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default OrgChartEditor;