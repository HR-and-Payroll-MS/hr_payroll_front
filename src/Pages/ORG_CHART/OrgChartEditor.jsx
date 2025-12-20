// src/components/org-chart/OrgChartEditor.jsx
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import CustomNodeCard from './CustomNodeCard';
import NodeModal from './NewModal';
import { getLayoutedElements } from './chartUtils';

const nodeTypes = { orgCard: CustomNodeCard };

const OrgChartEditor = ({ initialData, userRole }) => {
  // Check RBAC
  const canEdit = userRole === 'Manager' || userRole === 'HR';

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLayouted, setIsLayouted] = useState(false);

  // Modal Control
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'add', targetId: null, initialData: null });

  // Open modal for Adding
  const onAddClick = useCallback((parentId) => {
    setModalState({ isOpen: true, mode: 'add', targetId: parentId, initialData: null });
  }, []);

  // Open modal for Editing
  const onEditClick = useCallback((nodeId, currentData) => {
    setModalState({ isOpen: true, mode: 'edit', targetId: nodeId, initialData: currentData });
  }, []);

  const handleDelete = useCallback((id) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setIsLayouted(false);
    // REPLACE THIS: axios.delete(`/api/org-chart/${id}`)
  }, [setNodes, setEdges]);

  const handleModalSubmit = (formData) => {
    if (modalState.mode === 'add') {
      const newNodeId = uuidv4();
      const newNode = {
        id: newNodeId,
        type: 'orgCard',
        data: { ...formData, canEdit, onAddChild: onAddClick, onEdit: onEditClick, onDelete: handleDelete },
        position: { x: 0, y: 0 },
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => addEdge({ id: uuidv4(), source: modalState.targetId, target: newNodeId, type: 'smoothstep' }, eds));
      // REPLACE THIS: axios.post('/api/org-chart', newNode)
    } else {
      // Edit Mode
      setNodes((nds) => nds.map((n) => n.id === modalState.targetId ? { ...n, data: { ...n.data, ...formData } } : n));
      // REPLACE THIS: axios.put(`/api/org-chart/${modalState.targetId}`, formData)
    }
    setIsLayouted(false);
    setModalState({ ...modalState, isOpen: false });
  };

  // Sync initial data and inject role-based handlers
  useEffect(() => {
    const preparedNodes = initialData.nodes.map(n => ({
      ...n,
      data: { ...n.data, canEdit, onAddChild: onAddClick, onEdit: onEditClick, onDelete: handleDelete }
    }));
    setNodes(preparedNodes);
    setEdges(initialData.edges);
    setIsLayouted(false);
  }, [initialData, canEdit, onAddClick, onEditClick, handleDelete, setNodes, setEdges]);

  // Layouting
  useEffect(() => {
    if (isLayouted || nodes.length === 0) return;
    const { nodes: lNodes, edges: lEdges } = getLayoutedElements(nodes, edges, 'TB');
    setNodes([...lNodes]);
    setEdges([...lEdges]);
    setIsLayouted(true);
  }, [nodes, edges, isLayouted, setNodes, setEdges]);

  return (
    <div className="h-[600px] w-full bg-gray-50 border rounded-xl relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={canEdit} // Employees can't drag nodes
      >
        <Background />
        <Controls />
      </ReactFlow>

      <NodeModal 
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        initialData={modalState.initialData}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default OrgChartEditor;