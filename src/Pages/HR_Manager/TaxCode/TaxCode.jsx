import React, { useState } from 'react'
import { Plus, Trash2, Save, FileText, ChevronRight, ChevronDown, ArrowLeft, LayoutGrid, Eye, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import Header from '../../../Components/Header'
import FileDrawer from '../../../Components/FileDrawer';
import InputField from '../../../Components/InputField';
import Dropdown from '../../../Components/Dropdown';
function TaxCode() {
    const [view, setView] = useState('DASHBOARD');
    const [selectedCodeId, setSelectedCodeId] = useState(null);
    const [expandedVersionIndex, setExpandedVersionIndex] = useState(null);
    const closeEditor = () => {
  setModalOpen(false);
  setView(selectedCodeId ? 'VERSION_LIST' : 'DASHBOARD');
  setTaxData(null);
};
  const [isModalOpen,setModalOpen] =useState(false);
  const openModal =()=>setModalOpen(true);
    const [allTaxCodes, setAllTaxCodes] = useState([
        {
        id: 'TX_ETH_STD_2025',
        name: 'Ethiopian Federal Income Tax',
        isEnabled: true,
        versions: [
            {
            version: 'v1',
            validFrom: '2024-07-07',
            validTo: null,
            status: { active: true, locked: false },
            incomeTax: { 
                type: 'progressive', 
                flatRate: 0,
                brackets: [
                { min: 0, max: 600, rate: 0 },
                { min: 601, max: 1650, rate: 10 },
                { min: 1651, max: 3200, rate: 15 },
                { min: 3201, max: 5250, rate: 20 },
                { min: 5251, max: 7800, rate: 25 },
                { min: 7801, max: 10900, rate: 30 },
                { min: 10901, max: null, rate: 35 }
                ] 
            },
            pension: { employeePercent: 7, employerPercent: 11 },
            statutoryDeductions: [
                { name: 'Cost Sharing', percent: 10 },
                { name: 'Community Health Ins.', percent: 2 }
            ],
            exemptions: [
                { name: 'Transport Allowance', limit: 600, overtimeTaxable: false },
                { name: 'Housing Allowance', limit: 0, overtimeTaxable: true }
            ],
            rounding: { method: 'nearest', precision: 2 },
            compliance: [
                { label: 'Authority', value: 'Federal Ministry of Revenue' },
                { label: 'Proclamation', value: '979/2016' },
                { label: 'Country Code', value: 'ET' }
            ]
            },
            {
            version: 'v2',
            validFrom: '2024-07-07',
            validTo: null,
            status: { active: true, locked: false },
            incomeTax: { 
                type: 'progressive', 
                flatRate: 0,
                brackets: [
                { min: 0, max: 600, rate: 0 },
                { min: 601, max: 1650, rate: 10 },
                { min: 1651, max: 3200, rate: 15 },
                { min: 3201, max: 5250, rate: 20 },
                { min: 5251, max: 7800, rate: 25 },
                { min: 7801, max: 10900, rate: 30 },
                { min: 10901, max: null, rate: 35 }
                ] 
            },
            pension: { employeePercent: 7, employerPercent: 11 },
            statutoryDeductions: [
                { name: 'Cost Sharing', percent: 10 },
                { name: 'Community Health Ins.', percent: 2 }
            ],
            exemptions: [
                { name: 'Transport Allowance', limit: 600, overtimeTaxable: false },
                { name: 'Housing Allowance', limit: 0, overtimeTaxable: true }
            ],
            rounding: { method: 'nearest', precision: 2 },
            compliance: [
                { label: 'Authority', value: 'Federal Ministry of Revenue' },
                { label: 'Proclamation', value: '979/2016' },
                { label: 'Country Code', value: 'ET' }
            ]
            }
        ]
        },
        {
        id: 'TX_ETH_STD_2024',
        name: 'Ethiopian Federal Income Tax',
        isEnabled: true,
        versions: [
            {
            version: 'v1',
            validFrom: '2024-07-07',
            validTo: null,
            status: { active: true, locked: false },
            incomeTax: { 
                type: 'progressive', 
                flatRate: 0,
                brackets: [
                { min: 0, max: 600, rate: 0 },
                { min: 601, max: 1650, rate: 10 },
                { min: 1651, max: 3200, rate: 15 },
                { min: 3201, max: 5250, rate: 20 },
                { min: 5251, max: 7800, rate: 25 },
                { min: 7801, max: 10900, rate: 30 },
                { min: 10901, max: null, rate: 35 }
                ] 
            },
            pension: { employeePercent: 7, employerPercent: 11 },
            statutoryDeductions: [
                { name: 'Cost Sharing', percent: 10 },
                { name: 'Community Health Ins.', percent: 2 }
            ],
            exemptions: [
                { name: 'Transport Allowance', limit: 600, overtimeTaxable: false },
                { name: 'Housing Allowance', limit: 0, overtimeTaxable: true }
            ],
            rounding: { method: 'nearest', precision: 2 },
            compliance: [
                { label: 'Authority', value: 'Federal Ministry of Revenue' },
                { label: 'Proclamation', value: '979/2016' },
                { label: 'Country Code', value: 'ET' }
            ]
            }
        ]
        }
    ]);

    const [taxData, setTaxData] = useState(null);

    const handleChange = (path, value) => {
        const keys = path.split('.');
        setTaxData(prev => {
        let newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]]; }
        current[keys[keys.length - 1]] = value;
        return { ...newData };
        });
    }; //set task data with the value it get
    
    const addItem = (path, template) => {
        const keys = path.split('.');
        setTaxData(prev => {
        let newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]]; }
        current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], template];
        return { ...newData };
        });
    };//add 

    const removeItem = (path, index) => {
        const keys = path.split('.');
        setTaxData(prev => {
        let newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]]; }
        current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_, i) => i !== index);
        return { ...newData };
        });
    };

    const updateItem = (path, index, field, value) => {
    const keys = path.split('.');
    setTaxData(prev => {
      let newData = { ...prev };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]]; }
      current[keys[keys.length - 1]][index][field] = value;
      return { ...newData };
    });
  };
   const saveConfiguration = () => {
    console.log("Saving Tax Configuration JSON:", JSON.stringify(taxData, null, 2));
    if (selectedCodeId) {
      setAllTaxCodes(prev => prev.map(code => 
        code.id === selectedCodeId ? { ...code, versions: [...code.versions, { ...taxData, status: { active: false, locked: false } }] } : code
      ));
    } else {
      const newId = `TX_${taxData.name.toUpperCase().replace(/\s+/g, '_')}`;
      setAllTaxCodes([...allTaxCodes, { id: newId, name: taxData.name, isEnabled: true, versions: [{ ...taxData }] }]);
    }
    closeEditor();
  };
const drawer= <>{isModalOpen && <FileDrawer isModalOpen={isModalOpen} closeModal={closeEditor}>
            <div className="bg-white relative  shadow hover-bar h-full overflow-y-auto ">
                <div className="bg-slate-50 p-4 sticky z-20  top-0 flex justify-between items-center">
                <div>
                    <h1 className=" font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" /> {selectedCodeId ? `Adding Version: ${taxData.version}` : 'Configure New Tax Code'}
                    </h1>
                </div>
                <div className="flex text-slate-50 gap-4">
                    <button onClick={closeEditor} className="text-slate-400 cursor-pointer font-semibold hover:text-slate-900 transition-colors">Cancel</button>
                    <button onClick={saveConfiguration} className="bg-slate-800 hover:bg-slate-900 px-2 cursor-pointer py-2 rounded flex items-center gap-2 font-black text-xs  transition-all">
                    <Save className="w-4 h-4" /> 
                    </button>
                </div>
                </div>
        
                <div className="p-2 flex flex-col gap-2">
                {/* Header Data */}
                <div className="flex gap-2  items-center justify-between">
                    {!selectedCodeId && (
                    <div>
                        <label className="block text-xs fong-semibold text-slate-400 uppercase tracking-widest mb-2">Tax Code Name</label>
                        {/* <input type="text" value={taxData.name} className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-500 outline-none" 
                        onChange={(e) => handleChange('name', e.target.value)} /> */}
                        <InputField onSelect={(e) => handleChange('name', e)} icon={false} placeholder='' searchMode='input' maxWidth=''/>
                    </div>
                    )}
                    <div className={selectedCodeId ? 'col-span-2' : ''}>
                    <label className="block text-xs fong-semibold text-slate-400 uppercase tracking-widest mb-2">Version</label>
                    <input type="text" value={taxData.version} className="max-w-16 text-center p-2 outline-0 bg-slate-50 font-bold text-blue-600" readOnly />
                    </div>
                    <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">From</label>
                    <input type="date" value={taxData.validFrom} className="w-full border border-slate-100 p-2 rounded-xl focus:border-blue-500 outline-none" 
                        onChange={(e) => handleChange('validFrom', e.target.value)} />
                    </div>
                    <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">To (Optional)</label>
                    <input type="date" value={taxData.validTo || ''} className="w-full border border-slate-100 p-2 rounded-xl focus:border-blue-500 outline-none" 
                        onChange={(e) => handleChange('validTo', e.target.value || null)} />
                    </div>
                </div>
        
                {/* Income Tax Rule Selection */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-slate-50 pb-4">
                    <p className="text-xs font-semibold text-slate-800 uppercase tracking-widest">Income Tax Calculation</p>
                    <div className="flex inset-shadow-xs bg-slate-100 p-1 rounded-xl">
                        <button onClick={() => handleChange('incomeTax.type', 'progressive')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${taxData.incomeTax.type === 'progressive' ? 'bg-white shadow text-blue-600' : 'text-slate-400'}`}>Progressive</button>
                        <button onClick={() => handleChange('incomeTax.type', 'flat')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${taxData.incomeTax.type === 'flat' ? 'bg-white shadow text-blue-600' : 'text-slate-400'}`}>Flat Rate</button>
                    </div>
                    </div>
        
                    {taxData.incomeTax.type === 'flat' ? (
                    <div className="bg-blue-50 p-6 rounded shadow  border-blue-100 flex items-center gap-4">
                        <label className="font-semibold text-slate-800">Flat Rate Percentage:</label>
                        <input type="number" value={taxData.incomeTax.flatRate} className="w-24 outline-none p-2 rounded  border border-blue-200 font-semibold text-blue-600" onChange={(e) => handleChange('incomeTax.flatRate', parseInt(e.target.value))} />
                        <span className="font-semibold text-slate-800">%</span>
                    </div>
                    ) : (
                    <div className="space-y-3">
                        <SectionHeader title="Income Tax Brackets" onAdd={() => {
                        const last = taxData.incomeTax.brackets[taxData.incomeTax.brackets.length-1];
                        addItem('incomeTax.brackets', { min: last.max ? parseInt(last.max) + 1 : 0, max: '', rate: 0 });
                        }} />
                        {taxData.incomeTax.brackets.map((bracket, index) => (
                        <div key={index} className="flex gap-4 items-end bg-slate-50 p-5 rounded shadow-sm">
                            <div className="flex-1"><label className="text-xs text-slate-400 font-semibold uppercase">Min</label><input type="number" value={bracket.min|| ''} className="w-full outline-0 bg-white border border-slate-300 p-2 rounded mt-1 font-semibold" onChange={(e) => {const newBrackets = [...taxData.incomeTax.brackets];newBrackets[index].max = e.target.value === '' ? null : parseInt(e.target.value);handleChange('incomeTax.brackets', newBrackets)}} /></div>
                            <div className="flex-1"><label className="text-xs text-slate-400 font-semibold uppercase">Max (Blank for ∞)</label><input type="number" value={bracket.max || ''} className="w-full outline-0 bg-white border border-slate-300 p-2 rounded mt-1" onChange={(e) => {const newBrackets = [...taxData.incomeTax.brackets];newBrackets[index].max = e.target.value === '' ? null : parseInt(e.target.value);handleChange('incomeTax.brackets', newBrackets);}} /></div>
                            <div className="w-24"><label className="text-xs text-slate-400 font-semibold uppercase">Rate %</label><input type="number" value={bracket.rate} className="w-full outline-0 bg-white border border-slate-300 p-2 rounded  font-semibold text-blue-600" onChange={(e) => {const newBrackets = [...taxData.incomeTax.brackets];newBrackets[index].rate = parseInt(e.target.value);handleChange('incomeTax.brackets', newBrackets);}} /></div>
                            {index > 0 && <button onClick={() => removeItem('incomeTax.brackets', index)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={20} /></button>}
                        </div>
                        ))}
                    </div>
                    )}
                </div>
        
                <div className="flex gap-12 items-center justify-between">
                    <div className="space-y-4">
                    <h2 className="text-xs font-semibold text-slate-800 uppercase tracking-widest">Pension Contribution</h2>
                    <div className="flex gap-4  p-4 ">
                        <div><label className="text-xs font-bold text-slate-800 ">Employee %</label><input type="number" value={taxData.pension.employeePercent} className="w-full border-slate-300 p-2 rounded border focus:ring-0.5 ring-green-500 outline-none font-semibold" onChange={(e) => handleChange('pension.employeePercent', parseInt(e.target.value))} /></div>
                        <div><label className="text-xs font-bold text-slate-800 ">Employer %</label><input type="number" value={taxData.pension.employerPercent} className="w-full border-slate-300 p-2 rounded border focus:ring-0.5 ring-green-500 outline-none font-semibold" onChange={(e) => handleChange('pension.employerPercent', parseInt(e.target.value))} /></div>
                    </div>
                    </div>
                    <div className="space-y-4">
                    <h2 className="text-xs font-semibold text-slate-800 uppercase pb-3 h-full tracking-widest">Rounding Rules</h2>
                    <div className="flex items-baseline justify-baseline gap-4  p-4">
                        {/* <select value={taxData.rounding.method} className="flex-1 p-2 rounded border" onChange={(e) => handleChange('rounding.method', e.target.value)}>
                            <option value="nearest">Nearest</option><option value="up">Round Up</option><option value="down">Round Down</option>
                        </select> */}
                        <Dropdown padding='p-2' placeholder='Choose...' onChange={(e) => handleChange('rounding.method', e)} options={["nearest",'up',"down"]}/>
                        <input type="number" value={taxData.rounding.precision} className="w-20 p-2 rounded border border-slate-300 text-center font-semibold" onChange={(e) => handleChange('rounding.precision', parseInt(e.target.value))} />
                        
                    </div>
                    </div>
                </div>
        
                <div className="space-y-4">
                    <SectionHeader title="Statutory Deductions" onAdd={() => addItem('statutoryDeductions', { name: '', percent: 0 })} />
                    {taxData.statutoryDeductions.map((d, idx) => (
                    <div key={idx} className="flex gap-4 bg-white p-4 rounded shadow-xs">
                        <input placeholder="Item Name" value={d.name} className="flex-1 border-b outline-none p-1 focus:border-green-500" onChange={(e) => updateItem('statutoryDeductions', idx, 'name', e.target.value)} />
                        <input type="number" placeholder="%" value={d.percent} className="w-20 border border-slate-200 p-2 rounded-lg " onChange={(e) => updateItem('statutoryDeductions', idx, 'percent', parseInt(e.target.value))} />
                        <button onClick={() => removeItem('statutoryDeductions', idx)} className="text-red-400"><Trash2 size={18} /></button>
                    </div>
                    ))}
                </div>
        
                <div className="space-y-4">
                    <SectionHeader title="Allowances & Exemptions" onAdd={() => addItem('exemptions', { name: '', limit: 0, overtimeTaxable: true })} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {taxData.exemptions.map((ex, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded shadow flex flex-col gap-3">
                        <input placeholder="Exemption Label" value={ex.name} className="bg-transparent border-b p-1 outline-none focus:border-green-500" onChange={(e) => updateItem('exemptions', idx, 'name', e.target.value)} />
                        <div className="flex justify-between items-center">
                            <input type="number" value={ex.limit} className="w-24 border p-1 rounded bg-white text-xs" onChange={(e) => updateItem('exemptions', idx, 'limit', parseInt(e.target.value))} />
                            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                            <input type="checkbox" checked={ex.overtimeTaxable} onChange={(e) => updateItem('exemptions', idx, 'overtimeTaxable', e.target.checked)} />
                            OT Taxable
                            </label>
                        </div>
                        <button onClick={() => removeItem('exemptions', idx)} className="text-[10px] text-red-500 font-semibold self-end uppercase hover:underline">Remove</button>
                        </div>
                    ))}
                    </div>
                </div>
        
                <div className="space-y-4">
                    <SectionHeader title="Compliance & Local Authority" onAdd={() => addItem('compliance', { label: '', value: '' })} />
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {taxData.compliance.map((c, idx) => (
                        <div key={idx} className="flex flex-col gap-1 p-3 bg-white border rounded border-slate-200 ">
                        <input placeholder="Label" value={c.label} className="text-[10px] uppercase font-semibold text-slate-400 bg-transparent outline-none" onChange={(e) => updateItem('compliance', idx, 'label', e.target.value)} />
                        <div className="flex items-center gap-2">
                            <input placeholder="Value" value={c.value} className="flex-1 text-xs font-semibold bg-transparent outline-none focus:text-blue-600" onChange={(e) => updateItem('compliance', idx, 'value', e.target.value)} />
                            <button onClick={() => removeItem('compliance', idx)} className="text-slate-300 hover:text-red-500"><Trash2 size={14} /></button>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </FileDrawer>}</>
  if (view === 'DASHBOARD') {
      return (
        <div className="flex   h-full bg-slate-50 flex-col">
            {drawer}
          <div className="flex px-6 justify-between items-center ">
            <Header Title={"Tax Configuration"}><button 
              onClick={() => {
                setTaxData({ 
                  name: '', version: 'v1', validFrom: '', validTo: null,
                  status: { active: true, locked: false },
                  incomeTax: { type: 'progressive', flatRate: 0, brackets: [{ min: 0, max: '', rate: 0 }] }, 
                  pension: { employeePercent: 0, employerPercent: 0 },
                  statutoryDeductions: [{ name: '', percent: 0 }], 
                  exemptions: [{ name: '', limit: 0, overtimeTaxable: true }],
                  rounding: { method: 'nearest', precision: 2 },
                  compliance: [{ label: 'Authority', value: 'Ministry of Revenue' }]
                });
                setSelectedCodeId(null);
                // setView('EDITOR');
                openModal();
              }}
              className="bg-slate-700 text-xs cursor-pointer text-white px-4 py-2.5 rounded flex items-center gap-2 hover:bg-slate-900 transition-all shadow">
              <Plus size={18} /> Add New Tax Code
            </button></Header>
          </div>
          <div className="flex flex-col   p-4 flex-1  bg-white  ">
            {allTaxCodes.map(code => (
              <div key={code.id} onClick={() => { setSelectedCodeId(code.id); setView('VERSION_LIST'); }} className=" flex border-b gap-1.5 items-center  p-2 border-slate-300   hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="flex justify-between items-start ">
                   {/* <LayoutGrid size={24} /> */}
                </div>
                
                <div className={`rounded-xl flex-1  transition-colors `}>
                    <div className='flex items-center'><h2 className="  text-slate-800 group-hover:text-green-950">{code.name}</h2> • 
                    <div className=" flex items-center justify-between text-slate-400 font-normal text-xs">
                  <span>{code.versions.length} Versions</span></div>
                </div><p className="text-xs   text-slate-400  font-mono">{code.id}</p>
                </div>
                
                <div className={`rounded-xl  flex flex-col justify-center items-center transition-colors `}>
                    <button onClick={(e) => { e.stopPropagation(); setAllTaxCodes(prev => prev.map(c => c.id === code.id ? {...c, isEnabled: !c.isEnabled} : c)); }} className={`w-8 h-4 flex items-center rounded-full p-1 transition-colors ${code.isEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                        <div className={`bg-white w-3 h-3 rounded-full shadow transform transition-transform ${code.isEnabled ? 'translate-x-3' : ''}`} />
                    </button>
                
                  </div>
                
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (view === 'VERSION_LIST') {
        const code = allTaxCodes.find(c => c.id === selectedCodeId);
        return (
          <div className=" flex gap-2 flex-col">
            {drawer}
            <div className='flex px-6 py-4 shadow shadow-slate-300 bg-slate-100 items-center justify-center'>
                <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors">
                <ArrowLeft size={18} /> Back to TaxCodes
                </button>
                
                <div className="flex flex-1 justify-end items-center  gap-4">
                    <div>
                        <h1 className="
                         font-black text-slate-900">{code.name}</h1>
                        <p className="text-slate-400 text-xs">Deployment & Configuration History</p>
                    </div>
                    <button 
                        onClick={() => {
                        const last = code.versions[code.versions.length-1];
                        setTaxData({ ...JSON.parse(JSON.stringify(last)), version: `v${code.versions.length + 1}`, validFrom: '', validTo: null });
                // setView('EDITOR');
                        openModal();
                        }}
                        className="bg-green-600 text-white px-5 py-2 rounded flex items-center gap-2 text-xs font-semibold shadow shadow-blue-100">
                        <Plus size={18} /> New Version
                    </button>
                </div>
            </div>
    
            <div className="px-4">
              {code.versions.map((v, i) => (
                <div key={i} className="bg-white border-b overflow-hidden border-slate-200  hover:border-blue-200 transition-all">
                  <div className={`p-5 gap-4 flex justify-between  ${expandedVersionIndex === i?"bg-slate-50 shadow shadow-slate-800":""} items-center`}>
                    <div className="flex flex-1 items-center gap-6">
                      <div className="font-semibold text-slate-300 
                       tracking-tighter">{v.version}</div>
                      <div>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-semibold text-slate-700">{v.validFrom} {v.validTo ? `to ${v.validTo}` : '(Open)'}</span>
                           <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${v.status.active && code.isEnabled ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                             {v.status.active && code.isEnabled ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                             {v.status.active && code.isEnabled ? 'Active' : 'Inactive'}
                           </div>
                        </div>
                      </div>
                    </div>
                    <button 
                      disabled={!code.isEnabled}
                      onClick={(e) => { e.stopPropagation(); setAllTaxCodes(prev => prev.map(c => c.id === code.id ? {...c, versions: c.versions.map((ver, idx) => idx === i ? {...ver, status: {...ver.status, active: !ver.status.active}} : ver)} : c)); }}
                      className={`w-8 h-4 flex items-center rounded-full p-1 transition-colors ${!code.isEnabled ? 'opacity-20 bg-slate-400' : v.status.active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${v.status.active && code.isEnabled ? 'translate-x-3' : ''}`} />
                    </button>
                    <button onClick={() => setExpandedVersionIndex(expandedVersionIndex === i ? null : i)} className="text-blue-600 text-[11px] font-black uppercase mt-1 flex items-center gap-1 hover:underline">
                        <ChevronDown size={18} className={`transform transition-transform ${expandedVersionIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    
                  </div>
    
                  {expandedVersionIndex === i && (
                    <div className="bg-white p-8 border border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <div className="space-y-3">
                        <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">Tax Rule: {v.incomeTax.type}</p>
                        <div className=" bg-amber-50 overflow-hidden shadow-sm">
                           {v.incomeTax.type === 'flat' ? (
                             <div className="p-3 text-center font-bold text-blue-600">{v.incomeTax.flatRate}% Flat Rate</div>
                           ) : (
                             v.incomeTax.brackets.map((b, bi) => (
                               <div key={bi} className="flex shadow justify-between p-2 text-xs border-b-2 last:border-0 border-white">
                                 <span className="text-slate-500 font-medium">{b.min.toLocaleString()} - {b.max ? b.max.toLocaleString() : '∞'}</span>
                                 <span className="font-bold text-blue-600">{b.rate}%</span>
                               </div>
                             ))
                           )}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">Social Contribution</p>
                          <div className="bg-blue-200 text-white p-4 rounded shadow shadow-slate-400">
                            <div className="flex justify-between border-b border-blue-400 pb-2 mb-2">
                               <span className="text-xs opacity-80">Employee</span>
                               <span className="font-black">{v.pension.employeePercent}%</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-xs opacity-80">Employer</span>
                               <span className="font-black">{v.pension.employerPercent}%</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">Rounding</p>
                          <div className="bg-white p-3 rounded border border-slate-300 text-xs flex justify-between">
                            <span className="capitalize">{v.rounding.method}</span>
                            <span className="font-bold">{v.rounding.precision} Decimals</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">Exemptions</p>
                          <div className="space-y-2">
                            {v.exemptions.map((ex, exi) => (
                              <div key={exi} className="bg-white p-3 py-1.5 rounded border-slate-200 border text-[11px]">
                                <p className="font-bold text-slate-700">{ex.name}</p>
                                <p className="text-slate-400 mt-0.5">Limit: {ex.limit} | {ex.overtimeTaxable ? 'OT Taxable' : 'OT Exempt'}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='bg-slate-50 p-4'>
                          <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">Deductions & Compliance</p>
                          <div className="space-y-1">
                            {v.statutoryDeductions.map((d, di) => (
                              <div key={di} className="text-xs flex justify-between font-bold text-slate-600"><span>{d.name}</span><span>{d.percent}%</span></div>
                            ))}
                            {v.compliance.map((c, ci) => (
                              <div key={ci} className="text-[11px] flex justify-between text-slate-400 pt-1"><span>{c.label}</span><span>{c.value}</span></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      
//   return (<div className=" mx-auto p-6 bg-gray-50 min-h-screen">
       
//     </div>
//   )
}

const SectionHeader = ({ title, onAdd }) => (
  <div className="flex justify-between items-center border-b-2 border-slate-50 pb-4">
    <h2 className="text-xs font-semibold text-slate-800 uppercase tracking-widest">{title}</h2>
    <button onClick={onAdd} className="bg-slate-100 text-slate-600 px-3 py-1 shadow cursor-pointer rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-slate-200 transition-all">
      <Plus size={14} /> Add New
    </button>
  </div>
);

export default TaxCode