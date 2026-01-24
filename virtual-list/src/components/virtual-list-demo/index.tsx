import React, { useState, useCallback } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // 导入默认样式
import './index.css'; // 导入自定义样式
import { generateData } from './utils';

// 定义State类型
interface VirtualListDemoState {
  listHeight: number;
  listRowHeight: number;
  overscanRowCount: number;
  rowCount: number;
  scrollToIndex: number | null; // 改为number | null
  showScrollingPlaceholder: boolean;
  useDynamicRowHeight: boolean;
}

const VirtualListDemo: React.FC = () => {
  // 初始化状态
  const [state, setState] = useState<VirtualListDemoState>({
    listHeight: 300,
    listRowHeight: 50,
    overscanRowCount: 10,
    rowCount: 1000,
    scrollToIndex: null,
    showScrollingPlaceholder: false,
    useDynamicRowHeight: false,
  });

  // 获取数据项
  const getDatum = useCallback((index: number) => {
    const dataList = generateData(state.rowCount);
    return dataList[index % dataList.length];
  }, [state.rowCount]);

  // 获取行高（用于动态高度）
  const getRowHeight = ({ index }: { index: number }) => {
    return getDatum(index).size;
  };

  // 渲染空列表
  const noRowsRenderer = () => {
    return <div className="virtual-list-no-rows">No rows</div>;
  };

  // 处理行数变化
  const handleRowCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowCount = parseInt(event.target.value, 10) || 0;
    setState(prev => ({ ...prev, rowCount }));
  };

  // 处理滚动到指定行
  const handleScrollToRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowCount = state.rowCount;
    const inputValue = parseInt(event.target.value, 10);
    
    if (isNaN(inputValue)) {
      setState(prev => ({ ...prev, scrollToIndex: null }));
      return;
    }

    const scrollToIndex = Math.min(rowCount - 1, inputValue);
    setState(prev => ({ ...prev, scrollToIndex }));
  };

  // 行渲染器
  const rowRenderer = ({ index, isScrolling, key, style }: any) => {
    const { showScrollingPlaceholder, useDynamicRowHeight } = state;

    if (showScrollingPlaceholder && isScrolling) {
      return (
        <div
          key={key}
          style={style}
          className="virtual-list-row virtual-list-scrolling-placeholder"
        >
          Scrolling...
        </div>
      );
    }

    const datum = getDatum(index);

    let additionalContent;
    if (useDynamicRowHeight) {
      switch (datum.size) {
        case 75:
          additionalContent = <div>It is medium-sized.</div>;
          break;
        case 100:
          additionalContent = (
            <div>
              It is large-sized.
              <br />
              It has a 3rd row.
            </div>
          );
          break;
        case 125:
          additionalContent = (
            <div>
              It is extra-large.
              <br />
              It has multiple rows.
              <br />
              More content here.
            </div>
          );
          break;
        case 150:
          additionalContent = (
            <div>
              It is extra-extra-large.
              <br />
              It has many rows.
              <br />
              More content here.
              <br />
              Even more content.
            </div>
          );
          break;
      }
    }

    return (
      <div 
        key={key} 
        style={style}
        className="virtual-list-row"
      >
        <div
          className="virtual-list-letter"
          style={{
            backgroundColor: datum.color,
          }}
        >
          {datum.name.charAt(0)}
        </div>
        <div className="virtual-list-content">
          <div className="virtual-list-name">{datum.name}</div>
          <div className="virtual-list-index">This is row {index}</div>
          {additionalContent}
        </div>
        {useDynamicRowHeight && (
          <span className="virtual-list-height">{datum.size}px</span>
        )}
      </div>
    );
  };

  // 更新状态的辅助函数
  const updateState = (newState: Partial<VirtualListDemoState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const {
    listHeight,
    listRowHeight,
    overscanRowCount,
    rowCount,
    scrollToIndex,
    showScrollingPlaceholder,
    useDynamicRowHeight,
  } = state;

  return (
    <div className="virtual-list-container">
      <h2 className="virtual-list-title">Virtual List Demo</h2>
      
      <div className="virtual-list-description">
        <p>The list below is windowed (or "virtualized") meaning that only the visible rows are rendered. 
           Adjust its configurable properties below to see how it reacts.</p>
      </div>

      <div className="virtual-list-controls">
        <label className="virtual-list-checkbox">
          <input
            type="checkbox"
            checked={useDynamicRowHeight}
            onChange={(e) => updateState({ useDynamicRowHeight: e.target.checked })}
          />
          Use dynamic row heights?
        </label>

        <label className="virtual-list-checkbox">
          <input
            type="checkbox"
            checked={showScrollingPlaceholder}
            onChange={(e) => updateState({ showScrollingPlaceholder: e.target.checked })}
          />
          Show scrolling placeholder?
        </label>
      </div>

      <div className="virtual-list-input-grid">
        <div className="virtual-list-input-group">
          <label htmlFor="rowCount" className="virtual-list-label">Num rows</label>
          <input
            id="rowCount"
            type="number"
            className="virtual-list-input"
            value={rowCount}
            onChange={handleRowCountChange}
          />
        </div>
        
        <div className="virtual-list-input-group">
          <label htmlFor="scrollToIndex" className="virtual-list-label">Scroll to</label>
          <input
            id="scrollToIndex"
            type="number"
            className="virtual-list-input"
            placeholder="Index..."
            value={scrollToIndex ?? ''}
            onChange={handleScrollToRowChange}
          />
        </div>
        
        <div className="virtual-list-input-group">
          <label htmlFor="listHeight" className="virtual-list-label">List height</label>
          <input
            id="listHeight"
            type="number"
            className="virtual-list-input"
            value={listHeight}
            onChange={(e) => updateState({ listHeight: parseInt(e.target.value, 10) || 1 })}
          />
        </div>
        
        <div className="virtual-list-input-group">
          <label htmlFor="listRowHeight" className="virtual-list-label">Row height</label>
          <input
            id="listRowHeight"
            type="number"
            className="virtual-list-input"
            disabled={useDynamicRowHeight}
            value={listRowHeight}
            onChange={(e) => updateState({ listRowHeight: parseInt(e.target.value, 10) || 1 })}
          />
        </div>
        
        <div className="virtual-list-input-group">
          <label htmlFor="overscanRowCount" className="virtual-list-label">Overscan</label>
          <input
            id="overscanRowCount"
            type="number"
            className="virtual-list-input"
            value={overscanRowCount}
            onChange={(e) => updateState({ overscanRowCount: parseInt(e.target.value, 10) || 0 })}
          />
        </div>
      </div>

      <div 
        className="virtual-list-scroller" 
        style={{ height: `${listHeight}px` }}
      >
        <AutoSizer>
          {({ width, height }: { width: number; height: number }) => (
            <List
              height={listHeight}
              overscanRowCount={overscanRowCount}
              noRowsRenderer={noRowsRenderer}
              rowCount={rowCount}
              rowHeight={useDynamicRowHeight ? getRowHeight : listRowHeight}
              rowRenderer={rowRenderer}
              scrollToIndex={scrollToIndex ?? undefined}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default VirtualListDemo;
